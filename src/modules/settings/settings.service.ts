import { Injectable } from '@nestjs/common'
import { Setting } from '@modules/settings/entities/setting.entity'
import { SettingUpdateDto } from '@modules/settings/dto/setting-update.dto'

@Injectable()
export class SettingsService {
  public load(): Promise<Setting> {
    return Setting.load()
  }
  public update(dto: SettingUpdateDto): Promise<Setting> {
    return Setting.load().then(setting => setting.update(dto))
  }
}
