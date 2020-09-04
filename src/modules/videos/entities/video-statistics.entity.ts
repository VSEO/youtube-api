import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Like,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Video } from '@modules/videos/entities/video.entity'

@Entity('video_statistics')
export class VideoStatistics extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string
  @Column({ type: 'int', unsigned: true, nullable: false, default: 0 })
  viewCount: number
  @Column({ type: 'int', unsigned: true, nullable: false, default: 0 })
  likeCount: number
  @Column({ type: 'int', unsigned: true, nullable: false, default: 0 })
  dislikeCount: number
  @Column({ type: 'int', unsigned: true, nullable: false, default: 0 })
  favoriteCount: number
  @Column({ type: 'int', unsigned: true, nullable: false, default: 0 })
  commentCount: number
  @Column({ type: 'date', nullable: false })
  date: Date
  @CreateDateColumn()
  createdAt?: Date
  @UpdateDateColumn()
  updatedAt?: Date
  @ManyToOne(type => Video, video => video.videoStatistics)
  video: Video
}
