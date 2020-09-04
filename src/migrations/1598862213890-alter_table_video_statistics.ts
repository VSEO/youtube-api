import {MigrationInterface, QueryRunner} from "typeorm";

export class alterTableVideoStatistics1598862213890 implements MigrationInterface {
    name = 'alterTableVideoStatistics1598862213890'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `videos` CHANGE `thumbnails_default_url` `thumbnails_default_url` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `videos` CHANGE `thumbnails_default_width` `thumbnails_default_width` smallint UNSIGNED NULL");
        await queryRunner.query("ALTER TABLE `videos` CHANGE `thumbnails_default_height` `thumbnails_default_height` smallint UNSIGNED NULL");
        await queryRunner.query("ALTER TABLE `videos` CHANGE `thumbnails_medium_url` `thumbnails_medium_url` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `videos` CHANGE `thumbnails_medium_width` `thumbnails_medium_width` smallint UNSIGNED NULL");
        await queryRunner.query("ALTER TABLE `videos` CHANGE `thumbnails_medium_height` `thumbnails_medium_height` smallint UNSIGNED NULL");
        await queryRunner.query("ALTER TABLE `videos` CHANGE `thumbnails_high_url` `thumbnails_high_url` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `videos` CHANGE `thumbnails_high_width` `thumbnails_high_width` smallint UNSIGNED NULL");
        await queryRunner.query("ALTER TABLE `videos` CHANGE `thumbnails_high_height` `thumbnails_high_height` smallint UNSIGNED NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `videos` CHANGE `thumbnails_high_height` `thumbnails_high_height` smallint(5) UNSIGNED NOT NULL");
        await queryRunner.query("ALTER TABLE `videos` CHANGE `thumbnails_high_width` `thumbnails_high_width` smallint(5) UNSIGNED NOT NULL");
        await queryRunner.query("ALTER TABLE `videos` CHANGE `thumbnails_high_url` `thumbnails_high_url` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `videos` CHANGE `thumbnails_medium_height` `thumbnails_medium_height` smallint(5) UNSIGNED NOT NULL");
        await queryRunner.query("ALTER TABLE `videos` CHANGE `thumbnails_medium_width` `thumbnails_medium_width` smallint(5) UNSIGNED NOT NULL");
        await queryRunner.query("ALTER TABLE `videos` CHANGE `thumbnails_medium_url` `thumbnails_medium_url` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `videos` CHANGE `thumbnails_default_height` `thumbnails_default_height` smallint(5) UNSIGNED NOT NULL");
        await queryRunner.query("ALTER TABLE `videos` CHANGE `thumbnails_default_width` `thumbnails_default_width` smallint(5) UNSIGNED NOT NULL");
        await queryRunner.query("ALTER TABLE `videos` CHANGE `thumbnails_default_url` `thumbnails_default_url` varchar(255) NOT NULL");
    }

}
