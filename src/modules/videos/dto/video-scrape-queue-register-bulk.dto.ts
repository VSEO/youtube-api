import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { VideoScrapeQueue } from '@modules/videos/entities/video-scrape-queue.entity'
import { VideoScrapeQueueRegisterDto } from '@modules/videos/dto/video-scrape-queue-register.dto'

export class VideoScrapeQueueRegisterBulkDto {
  dtos: VideoScrapeQueueRegisterDto[] = []

  constructor() {}

  add(dto: VideoScrapeQueueRegisterDto) {
    this.dtos.push(dto)
  }

  values(): QueryDeepPartialEntity<VideoScrapeQueue>[] {
    return this.dtos.map(dto => dto.create())
  }
}
