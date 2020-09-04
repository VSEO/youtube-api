import { Column } from 'typeorm'

export class SettingThreshold {
  @Column({ type: 'int', unsigned: true, default: 1000000 })
  upper: number
  @Column({ type: 'int', unsigned: true, default: 100000 })
  median: number
  @Column({ type: 'int', unsigned: true, default: 10000 })
  lower: number
}
