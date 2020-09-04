import { Injectable } from '@nestjs/common'
import * as moment from 'moment'
import { VideoSearchDto } from '@modules/videos/dto/video-search.dto'
import { Video } from '@modules/videos/entities/video.entity'
import { YoutubeService } from '@shared/services/youtube.service'
import { VideoCategory } from '@modules/videos/entities/video-category.entity'
import { VideoRegisterDto } from '@modules/videos/dto/video-register.dto'
import { VideoStatisticsRegisterDto } from '@modules/videos/dto/video-statistics-register.dto'
import { getManager } from 'typeorm'

@Injectable()
export class VideosService {
  constructor(private readonly youtubeService: YoutubeService) {}

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
  public async scrape(): Promise<any> {
    await getManager().transaction(async () => {
      const videoCategory = await VideoCategory.load(1)

      const items = await this.youtubeService.searchAndVideos({
        videoCategoryId: videoCategory.id.toString()
      }, 5000)
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
    })
    return
  }
}
