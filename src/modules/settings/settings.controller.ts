import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@guards/auth.guard'
import { RolesGuard } from '@guards/roles.guard'
import { Roles } from '@decorators/roles.decorator'
import { Setting } from '@modules/settings/entities/setting.entity'
import { SettingsService } from '@modules/settings/settings.service'
import { SettingUpdateDto } from '@modules/settings/dto/setting-update.dto'
import { Role } from '@modules/users/entities/user.entity'

@Controller('settings')
@UseGuards(AuthGuard, RolesGuard)
export class SettingsController {
  constructor(private readonly service: SettingsService) {}

  @Get()
  public load(): Promise<Setting> {
    return this.service.load()
  }

  @Patch()
  @Roles(Role.ADMIN)
  public update(@Body() dto: SettingUpdateDto): Promise<Setting> {
    return this.service.update(dto)
  }
}
