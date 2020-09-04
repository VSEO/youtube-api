import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator'
import { VideoCategory } from '@modules/videos/entities/video-category.entity'

export class VideoCategoryRegisterDto {
  @IsNotEmpty()
  @IsNumber()
  readonly id: number
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  readonly title: string
  @IsNotEmpty()
  @IsBoolean()
  readonly assignable: boolean
  @IsOptional()
  @IsString()
  @MaxLength(255)
  readonly channelId: string

  constructor(init?: Partial<VideoCategoryRegisterDto>) {
    Object.assign(this, init)
  }

  create(): VideoCategory {
    return VideoCategory.create({
      id: this.id,
      title: this.title,
      assignable: this.assignable,
      channelId: this.channelId
    })
  }
}
