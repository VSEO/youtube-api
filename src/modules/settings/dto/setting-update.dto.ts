import { IsNotEmpty, IsNumber } from 'class-validator'
import { Setting } from '@modules/settings/entities/setting.entity'
import { Type } from 'class-transformer'

export class SettingUpdateDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  readonly averageViewCountUpper: number
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  readonly averageViewCountMedian: number
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  readonly averageViewCountLower: number
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  readonly weeklyPublishCountUpper: number
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  readonly weeklyPublishCountMedian: number
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  readonly weeklyPublishCountLower: number
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  readonly weeklyViewCountUpper: number
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  readonly weeklyViewCountMedian: number
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  readonly weeklyViewCountLower: number

  modify(setting: Setting): Setting {
    Object.assign(setting, {
      averageViewCount: {
        upper: this.averageViewCountUpper,
        median: this.averageViewCountMedian,
        lower: this.averageViewCountLower,
      },
      weeklyPublishCount: {
        upper: this.weeklyPublishCountUpper,
        median: this.weeklyPublishCountMedian,
        lower: this.weeklyPublishCountLower,
      },
      weeklyViewCount: {
        upper: this.weeklyViewCountUpper,
        median: this.weeklyViewCountMedian,
        lower: this.weeklyViewCountLower,
      }
    })
    return setting
  }
}
