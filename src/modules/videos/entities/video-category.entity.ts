import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany, PrimaryColumn,
  UpdateDateColumn
} from 'typeorm'
import { Video } from '@modules/videos/entities/video.entity'
import { VideoCategoryRegisterDto } from '@modules/videos/dto/video-category-register.dto'

@Entity('video_categories')
export class VideoCategory extends BaseEntity {
  @PrimaryColumn({ type: 'int', unsigned: true, nullable: false })
  id: number
  @Column({ type: 'varchar', length: 255, nullable: false })
  title: string
  @Column({ type: 'boolean', default: false })
  assignable: boolean
  @Column({ type: 'varchar', length: 255, nullable: true })
  channelId: string
  @CreateDateColumn()
  createdAt?: Date
  @UpdateDateColumn()
  updatedAt?: Date
  @OneToMany(type => Video, video => video.videoCategory, { cascade: true })
  videos: Video[]

  public static load(id: number): Promise<VideoCategory> {
    return VideoCategory.findOneOrFail({ id })
  }
  public static loadAll(): Promise<VideoCategory[]> {
    return VideoCategory.find()
  }
  public static register(dto: VideoCategoryRegisterDto): Promise<VideoCategory> {
    return dto.create().save()
  }
}
