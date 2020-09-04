import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { SettingThreshold } from '@modules/settings/entities/setting-threshold.embedded'
import { SettingUpdateDto } from '@modules/settings/dto/setting-update.dto'

@Entity('settings')
export class Setting extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string
  @Column(type => SettingThreshold, { prefix: 'average_view_count_' })
  averageViewCount: SettingThreshold
  @Column(type => SettingThreshold, { prefix: 'weekly_publish_count_' })
  weeklyPublishCount: SettingThreshold
  @Column(type => SettingThreshold, { prefix: 'weekly_view_count_' })
  weeklyViewCount: SettingThreshold
  @CreateDateColumn()
  createdAt?: Date
  @UpdateDateColumn()
  updatedAt?: Date

  public static load(): Promise<Setting> {
    return Setting.findOneOrFail({ where: { id: 1 } })
  }
  public static register(): Promise<Setting> {
    return Setting.create().save()
  }

  public update(dto: SettingUpdateDto): Promise<Setting> {
    return dto.modify(this).save()
  }
}
