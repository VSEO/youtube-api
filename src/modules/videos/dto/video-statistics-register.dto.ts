import { youtube_v3 as YoutubeV3 } from 'googleapis'
import { IsNotEmpty, IsOptional } from 'class-validator'
import { Video } from '@modules/videos/entities/video.entity'
import { VideoStatistics } from '@modules/videos/entities/video-statistics.entity'

export class VideoStatisticsRegisterDto {
  @IsNotEmpty()
  statistics: YoutubeV3.Schema$VideoStatistics
  @IsOptional()
  date: Date

  constructor(init?: Partial<VideoStatisticsRegisterDto>) {
    Object.assign(this, init, {
      date: new Date()
    })
  }

  create(video: Video): VideoStatistics {
    return VideoStatistics.create({
      viewCount: parseInt(this.statistics.viewCount) || 0,
      likeCount: parseInt(this.statistics.likeCount) || 0,
      dislikeCount: parseInt(this.statistics.dislikeCount) || 0,
      favoriteCount: parseInt(this.statistics.favoriteCount) || 0,
      commentCount: parseInt(this.statistics.commentCount) || 0,
      date: this.date,
      video
    })
  }
}
