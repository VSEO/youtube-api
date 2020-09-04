import {MigrationInterface, QueryRunner} from "typeorm";

export class alterTableVideoStatisticsAddDateColumn1599041688411 implements MigrationInterface {
    name = 'alterTableVideoStatisticsAddDateColumn1599041688411'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `video_statistics` ADD `date` date NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `video_statistics` DROP COLUMN `date`");
    }

}
