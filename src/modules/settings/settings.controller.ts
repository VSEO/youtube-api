import { Body, Controller, Get, Patch } from '@nestjs/common'
import { Setting } from '@modules/settings/entities/setting.entity'
import { SettingsService } from '@modules/settings/settings.service'
import { SettingUpdateDto } from '@modules/settings/dto/setting-update.dto'

@Controller('settings')
export class SettingsController {
  constructor(private readonly service: SettingsService) {}

  @Get()
  public load(): Promise<Setting> {
    return this.service.load()
  }

  @Patch()
  public update(@Body() dto: SettingUpdateDto): Promise<Setting> {
    return this.service.update(dto)
  }
}
