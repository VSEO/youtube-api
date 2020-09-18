import {
  BaseEntity, Between, Brackets,
  Column,
  CreateDateColumn,
  Entity,
  Like,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm'
import { VideoThumbnails } from '@modules/videos/entities/video-thumbnails.embbed'
import { VideoSearchDto } from '@modules/videos/dto/video-search.dto'
import { VideoStatistics } from '@modules/videos/entities/video-statistics.entity'
import { VideoCategory } from '@modules/videos/entities/video-category.entity'
import { VideoRegisterDto } from '@modules/videos/dto/video-register.dto'
import { VideoStatisticsRegisterDto } from '@modules/videos/dto/video-statistics-register.dto'

export enum VideoLiveBroadcastContent {
  LIVE = 'live',
  UPCOMING = 'upcoming',
  NONE = 'none'
}

@Entity('videos')
export class Video extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', unique: true, length: 11 })
  id: string
  @Column({ type: 'varchar', length: 255, nullable: false })
  title: string
  @Column({ type: 'text', nullable: true })
  description: string
  @Column({ type: 'varchar', length: 24, nullable: false })
  channelId: Date
  @Column({ type: 'varchar', length: 255, nullable: false })
  channelTitle: string
  @Column(type => VideoThumbnails, { prefix: 'thumbnails' })
  thumbnails: VideoThumbnails
  @Column({ type: 'enum', enum: VideoLiveBroadcastContent, default: VideoLiveBroadcastContent.NONE })
  liveBroadcastContent: VideoLiveBroadcastContent
  @Column({ type: 'date', nullable: false })
  publishedAt: Date
  @CreateDateColumn()
  createdAt?: Date
  @UpdateDateColumn()
  updatedAt?: Date
  @OneToMany(type => VideoStatistics, videoStatistics => videoStatistics.video, { cascade: true })
  videoStatistics: VideoStatistics[]
  @ManyToOne(type => VideoCategory, videoCategory => videoCategory.videos)
  videoCategory: VideoCategory

  public static get(id: string): Promise<Video> {
    return Video.findOne({ where: { id }, relations: ['videoStatistics'] })
  }
  public static search(dto: VideoSearchDto): Promise<Video[]> {
    return Video.find({ title: Like(dto.keyword || '') })
  }
  public static async register(dto: VideoRegisterDto): Promise<Video> {
    return dto.create().save()
  }
  public static async calcAverageViewCount(dto: VideoSearchDto): Promise<number> {
    const raw = await Video.createQueryBuilder()
      .select('AVG(gv.count) AS average')
      .from(qb => qb
          .select('v.id AS id, MAX(vs.viewCount) AS count')
          .from(Video, 'v')
          .innerJoin('v.videoStatistics', 'vs')
          .where(qb => {
            qb
              .where('v.title LIKE :title', { title: `%${dto.keyword}%` })
              .orWhere('v.description LIKE :description', { description: `%${dto.keyword}%` })
          })
          .groupBy('v.id')
      , 'gv')
      .getRawOne()
    return parseInt(raw?.['average'] || 0)
  }
  public static calcWeeklyPublishCount(dto: VideoSearchDto): Promise<number> {
    return Video.createQueryBuilder()
      .where(
        new Brackets(qb =>
          qb
            .where('title LIKE :title', { title: `%${dto.keyword}%` })
            .orWhere('description LIKE :description', { description: `%${dto.keyword}%` })
        )
      )
      .andWhere(`published_at BETWEEN (NOW() - INTERVAL 1 WEEK) AND NOW()`)
      .getCount()
  }
  public static async calcWeeklyViewCount(dto: VideoSearchDto): Promise<number> {
    const raw = await Video.createQueryBuilder()
      .select('SUM(gv.count) AS sum')
      .from(qb => qb
          // eslint-disable-next-line max-len
          .select(`v.id AS id, CASE WHEN MAX(vs.viewCount) = MIN(vs.viewCount) THEN MAX(vs.viewCount) ELSE MAX(vs.viewCount) - MIN(vs.viewCount) END AS count`)
          .from(Video, 'v')
          .innerJoin('v.videoStatistics', 'vs')
          .where(
            new Brackets(qb =>
              qb
                .where('v.title LIKE :title', { title: `%${dto.keyword}%` })
                .orWhere('v.description LIKE :description', { description: `%${dto.keyword}%` })
            )
          )
          .andWhere(`vs.date BETWEEN (NOW() - INTERVAL 1 WEEK) AND NOW()`)
          .groupBy('v.id')
        , 'gv')
      .getRawOne()
    return parseInt(raw?.['sum'] || 0)
  }

  public registerStatistics(dto: VideoStatisticsRegisterDto): Promise<VideoStatistics> {
    return dto.create(this).save()
  }
}
