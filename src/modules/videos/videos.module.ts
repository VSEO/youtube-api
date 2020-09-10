import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Video } from '@modules/videos/entities/video.entity'
import { VideoCategory } from '@modules/videos/entities/video-category.entity'
import { VideoStatistics } from '@modules/videos/entities/video-statistics.entity'
import { VideosController } from '@modules/videos/videos.controller'
import { VideosService } from '@modules/videos/videos.service'
import { VideoScrapeQueue } from '@modules/videos/entities/video-scrape-queue.entity'
import { SharedModule } from '@shared/shared.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Video, VideoCategory, VideoStatistics, VideoScrapeQueue]),
    SharedModule
  ],
  controllers: [VideosController],
  providers: [VideosService]
})
export class VideosModule {}
