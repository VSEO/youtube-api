import { MigrationInterface, QueryRunner } from "typeorm"
import { Setting } from '@modules/settings/entities/setting.entity'

export class seedSetting1598698698947 implements MigrationInterface {
  name = 'seedSetting1598698698947'

  public async up(queryRunner: QueryRunner): Promise<any> {
      await Setting.register()
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    // do nothing
  }

}
