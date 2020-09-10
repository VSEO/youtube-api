import { IsDate, IsNotEmpty, IsNumber } from 'class-validator'
import { VideoScrapeQueue } from '@modules/videos/entities/video-scrape-queue.entity'

export class VideoScrapeQueueRegisterDto {
  @IsNotEmpty()
  @IsDate()
  scheduledDate: string
  @IsNotEmpty()
  @IsNumber()
  videoCategoryId: number

  constructor(init?: Partial<VideoScrapeQueueRegisterDto>) {
    Object.assign(this, init)
  }

  create(): VideoScrapeQueue {
    return VideoScrapeQueue.create({
      scheduledDate: this.scheduledDate,
      videoCategoryId: this.videoCategoryId,
    })
  }
}
