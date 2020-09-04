import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class VideoSearchDto {
  @IsNotEmpty()
  @IsString()
  keyword?: string
}
