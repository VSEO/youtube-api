import { Global, HttpModule, Module } from '@nestjs/common'
import { ConfigService } from '@shared/services/config.service'
import { YoutubeService } from '@shared/services/youtube.service'

const providers = [ConfigService, YoutubeService]

@Global()
@Module({
  imports: [HttpModule],
  providers,
  exports: [...providers]
})
export class SharedModule {}

