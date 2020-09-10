import { BaseEntity, Column, CreateDateColumn, Entity, FindConditions, PrimaryColumn, UpdateDateColumn } from 'typeorm'
import { VideoScrapeQueueRegisterBulkDto } from '@modules/videos/dto/video-scrape-queue-register-bulk.dto'
import * as moment from 'moment'

export enum VideoScrapeQueueStatus {
  OPEN = 1,
  CLOSED = 2
}

@Entity('video_scrape_queue')
export class VideoScrapeQueue extends BaseEntity {
  @PrimaryColumn({
    type: 'date',
    nullable: false,
    transformer: {
      from: value => moment(value).format('YYYY-MM-DD'),
      to: value => value,
    }
  })
  scheduledDate: string
  @PrimaryColumn({ type: 'int', unsigned: true, nullable: false })
  videoCategoryId: number
  @Column({ type: 'enum', enum: VideoScrapeQueueStatus, default: VideoScrapeQueueStatus.OPEN })
  status: VideoScrapeQueueStatus
  @CreateDateColumn()
  createdAt?: Date
  @UpdateDateColumn()
  updatedAt?: Date

  public static load(scheduledDate: string, videoCategoryId: number): Promise<VideoScrapeQueue> {
    return VideoScrapeQueue.findOneOrFail({ scheduledDate, videoCategoryId })
  }
  public static async getOpenForUpdate(): Promise<VideoScrapeQueue> {
    const where: FindConditions<VideoScrapeQueue> = {
      scheduledDate: moment().format('YYYY-MM-DD'),
      status: VideoScrapeQueueStatus.OPEN
    }
    const [query, params] = VideoScrapeQueue
      .createQueryBuilder('vsq')
      .select(['vsq.scheduledDate as scheduledDate', 'vsq.videoCategoryId as videoCategoryId'])
      .where(where)
      .limit(1)
      .getQueryAndParameters()

    const raw = await VideoScrapeQueue
      .query(query + ' FOR UPDATE SKIP LOCKED', params)
      .then(data => data?.[0])
    return raw ? this.load(raw.scheduledDate, raw.videoCategoryId) : undefined
  }

  public static registerBulk(dto: VideoScrapeQueueRegisterBulkDto): Promise<any> {
    return VideoScrapeQueue.createQueryBuilder()
      .insert()
      .values(dto.values())
      .execute()
  }

  public closed(): Promise<VideoScrapeQueue> {
    this.status = VideoScrapeQueueStatus.CLOSED
    return this.save()
  }
}
