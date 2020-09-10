import { Injectable } from '@nestjs/common'
import * as moment from 'moment'
import { VideoSearchDto } from '@modules/videos/dto/video-search.dto'
import { Video } from '@modules/videos/entities/video.entity'
import { ConfigService } from '@shared/services/config.service'
import { YoutubeService } from '@shared/services/youtube.service'
import { VideoCategory } from '@modules/videos/entities/video-category.entity'
import { VideoRegisterDto } from '@modules/videos/dto/video-register.dto'
import { VideoStatisticsRegisterDto } from '@modules/videos/dto/video-statistics-register.dto'
import { getManager } from 'typeorm'
import { VideoScrapeQueue } from '@modules/videos/entities/video-scrape-queue.entity'
import { VideoScrapeQueueRegisterBulkDto } from '@modules/videos/dto/video-scrape-queue-register-bulk.dto'
import { VideoScrapeQueueRegisterDto } from '@modules/videos/dto/video-scrape-queue-register.dto'

@Injectable()
export class VideosService {
  constructor(
    private readonly configService: ConfigService,
    private readonly youtubeService: YoutubeService
  ) {}

  public search(dto: VideoSearchDto): Promise<Video[]> {
    return Video.search(dto)
  }

  public async statistics(dto: VideoSearchDto): Promise<object> {
    return {
      keyword: dto.keyword,
      averageViewCount: await Video.calcAverageViewCount(dto),
      weeklyPublishCount: await Video.calcWeeklyPublishCount(dto),
      weeklyViewCount: await Video.calcWeeklyViewCount(dto)
    }
  }

  public async suggest(dto: VideoSearchDto): Promise<object> {
    return this.youtubeService.suggest(dto.keyword)
  }

  public async queue(): Promise<any> {
    await getManager().transaction(async () => {
      const videoCategories = await VideoCategory.loadAll()

      if (videoCategories.length > 0) {
        const dto = new VideoScrapeQueueRegisterBulkDto()
        const scheduledDate = moment().format('YYYY-MM-DD')
        videoCategories.forEach(videoCategory => {
          const _dto = new VideoScrapeQueueRegisterDto({
            scheduledDate,
            videoCategoryId: videoCategory.id
          })
          dto.add(_dto)
        })

        await VideoScrapeQueue.registerBulk(dto)
      }
    })
    return
  }

  public async scrape(): Promise<any> {
    await getManager().transaction(async () => {
      const videoScrapeQueue = await VideoScrapeQueue.getOpenForUpdate()
      if (!videoScrapeQueue) {
        return
      }

      const videoCategory = await VideoCategory.load(videoScrapeQueue.videoCategoryId)
      const items = await this.youtubeService.searchAndVideos({
        videoCategoryId: videoCategory.id.toString()
      }, this.configService.get('youtube.api.total'))
      await Promise.all(
        items.map(async item => {
          let video = await Video.get(item.id)
          if (!video) {
            video = await Video.register(new VideoRegisterDto({ item, videoCategory }))
          }

          const dto = new VideoStatisticsRegisterDto({ statistics: item.statistics })
          if (!video.videoStatistics.some(vs => moment(dto.date).isSame(vs.date, 'day'))) {
            await video.registerStatistics(dto)
          }
        })
      )

      await videoScrapeQueue.closed()
    })
    return
  }
}
