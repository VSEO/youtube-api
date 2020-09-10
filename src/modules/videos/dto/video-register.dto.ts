import { youtube_v3 as YoutubeV3 } from 'googleapis'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { Video, VideoLiveBroadcastContent } from '@modules/videos/entities/video.entity'
import { VideoCategory } from '@modules/videos/entities/video-category.entity'

export class VideoRegisterDto {
  @IsNotEmpty()
  item: YoutubeV3.Schema$Video
  @IsNotEmpty()
  videoCategory: VideoCategory

  constructor(init?: Partial<VideoRegisterDto>) {
    Object.assign(this, init)
  }

  create(): Video {
    return Video.create({
      id: this.item.id,
      title: this.item.snippet.title,
      description: this.item.snippet.description,
      channelId: this.item.snippet.channelId,
      channelTitle: this.item.snippet.channelTitle,
      thumbnails: {
        default: this.item.snippet.thumbnails.default,
        high: this.item.snippet.thumbnails.high,
        medium: this.item.snippet.thumbnails.medium
      },
      liveBroadcastContent: this.item.snippet.liveBroadcastContent as VideoLiveBroadcastContent,
      publishedAt: new Date(this.item.snippet.publishedAt),
      videoCategory: this.videoCategory,
      videoStatistics: []
    })
  }
}
