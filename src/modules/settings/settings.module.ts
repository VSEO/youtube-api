import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Setting } from '@modules/settings/entities/setting.entity'
import { SettingsController } from '@modules/settings/settings.controller'
import { SettingsService } from '@modules/settings/settings.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Setting]),
  ],
  controllers: [SettingsController],
  providers: [SettingsService]
})
export class SettingsModule {}
