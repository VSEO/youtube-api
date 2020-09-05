import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@guards/auth.guard'
import { VideoSearchDto } from '@modules/videos/dto/video-search.dto'
import { VideosService } from '@modules/videos/videos.service'

@Controller('videos')
@UseGuards(AuthGuard)
export class VideosController {
  constructor(private readonly service: VideosService) {}

  @Get('statistics')
  public statistics(@Query() dto: VideoSearchDto): Promise<object> {
    return this.service.statistics(dto)
  }
  @Get('suggest')
  public suggest(@Query() dto: VideoSearchDto): Promise<object> {
    return this.service.suggest(dto)
  }
  // @Post('scrape')
  // public async scrape(): Promise<any> {
  //   return await this.service.scrape()
  // }
}
