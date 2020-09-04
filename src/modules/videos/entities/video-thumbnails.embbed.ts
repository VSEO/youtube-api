import { Column } from 'typeorm'

export class VideoThumbnail {
  @Column({ type: 'varchar', length: '255', nullable: true })
  url?: string
  @Column({ type: 'smallint', unsigned: true, nullable: true })
  width?: number
  @Column({ type: 'smallint', unsigned: true, nullable: true })
  height?: number
}
export class VideoThumbnails {
  @Column(type => VideoThumbnail, { prefix: 'default_' })
  default: VideoThumbnail
  @Column(type => VideoThumbnail, { prefix: 'medium_' })
  medium: VideoThumbnail
  @Column(type => VideoThumbnail, { prefix: 'high_' })
  high: VideoThumbnail
}
