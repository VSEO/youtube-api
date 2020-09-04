import {MigrationInterface, QueryRunner} from "typeorm";

export class addTableSettings1598698622329 implements MigrationInterface {
    name = 'addTableSettings1598698622329'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `settings` (`id` int NOT NULL AUTO_INCREMENT, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `average_view_countupper` int UNSIGNED NOT NULL DEFAULT 1000000, `average_view_countmedian` int UNSIGNED NOT NULL DEFAULT 100000, `average_view_countlower` int UNSIGNED NOT NULL DEFAULT 10000, `weekly_publish_countupper` int UNSIGNED NOT NULL DEFAULT 1000000, `weekly_publish_countmedian` int UNSIGNED NOT NULL DEFAULT 100000, `weekly_publish_countlower` int UNSIGNED NOT NULL DEFAULT 10000, `weekly_view_countupper` int UNSIGNED NOT NULL DEFAULT 1000000, `weekly_view_countmedian` int UNSIGNED NOT NULL DEFAULT 100000, `weekly_view_countlower` int UNSIGNED NOT NULL DEFAULT 10000, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `video_statistics` CHANGE `view_count` `view_count` int UNSIGNED NOT NULL DEFAULT 0");
        await queryRunner.query("ALTER TABLE `video_statistics` CHANGE `like_count` `like_count` int UNSIGNED NOT NULL DEFAULT 0");
        await queryRunner.query("ALTER TABLE `video_statistics` CHANGE `dislike_count` `dislike_count` int UNSIGNED NOT NULL DEFAULT 0");
        await queryRunner.query("ALTER TABLE `video_statistics` CHANGE `favorite_count` `favorite_count` int UNSIGNED NOT NULL DEFAULT 0");
        await queryRunner.query("ALTER TABLE `video_statistics` CHANGE `comment_count` `comment_count` int UNSIGNED NOT NULL DEFAULT 0");
        await queryRunner.query("ALTER TABLE `videos` DROP FOREIGN KEY `FK_821c69129852706ec564167b1fb`");
        await queryRunner.query("ALTER TABLE `videos` CHANGE `video_category_id` `video_category_id` int UNSIGNED NULL");
        await queryRunner.query("ALTER TABLE `videos` CHANGE `thumbnails_default_width` `thumbnails_default_width` smallint UNSIGNED NOT NULL");
        await queryRunner.query("ALTER TABLE `videos` CHANGE `thumbnails_default_height` `thumbnails_default_height` smallint UNSIGNED NOT NULL");
        await queryRunner.query("ALTER TABLE `videos` CHANGE `thumbnails_medium_width` `thumbnails_medium_width` smallint UNSIGNED NOT NULL");
        await queryRunner.query("ALTER TABLE `videos` CHANGE `thumbnails_medium_height` `thumbnails_medium_height` smallint UNSIGNED NOT NULL");
        await queryRunner.query("ALTER TABLE `videos` CHANGE `thumbnails_high_width` `thumbnails_high_width` smallint UNSIGNED NOT NULL");
        await queryRunner.query("ALTER TABLE `videos` CHANGE `thumbnails_high_height` `thumbnails_high_height` smallint UNSIGNED NOT NULL");
        await queryRunner.query("ALTER TABLE `video_categories` CHANGE `id` `id` int UNSIGNED NOT NULL");
        await queryRunner.query("ALTER TABLE `videos` ADD CONSTRAINT `FK_821c69129852706ec564167b1fb` FOREIGN KEY (`video_category_id`) REFERENCES `video_categories`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `videos` DROP FOREIGN KEY `FK_821c69129852706ec564167b1fb`");
        await queryRunner.query("ALTER TABLE `video_categories` CHANGE `id` `id` int(10) UNSIGNED NOT NULL");
        await queryRunner.query("ALTER TABLE `videos` CHANGE `thumbnails_high_height` `thumbnails_high_height` smallint(5) UNSIGNED NOT NULL");
        await queryRunner.query("ALTER TABLE `videos` CHANGE `thumbnails_high_width` `thumbnails_high_width` smallint(5) UNSIGNED NOT NULL");
        await queryRunner.query("ALTER TABLE `videos` CHANGE `thumbnails_medium_height` `thumbnails_medium_height` smallint(5) UNSIGNED NOT NULL");
        await queryRunner.query("ALTER TABLE `videos` CHANGE `thumbnails_medium_width` `thumbnails_medium_width` smallint(5) UNSIGNED NOT NULL");
        await queryRunner.query("ALTER TABLE `videos` CHANGE `thumbnails_default_height` `thumbnails_default_height` smallint(5) UNSIGNED NOT NULL");
        await queryRunner.query("ALTER TABLE `videos` CHANGE `thumbnails_default_width` `thumbnails_default_width` smallint(5) UNSIGNED NOT NULL");
        await queryRunner.query("ALTER TABLE `videos` CHANGE `video_category_id` `video_category_id` int(10) UNSIGNED NULL");
        await queryRunner.query("ALTER TABLE `videos` ADD CONSTRAINT `FK_821c69129852706ec564167b1fb` FOREIGN KEY (`video_category_id`) REFERENCES `video_categories`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `video_statistics` CHANGE `comment_count` `comment_count` int(10) UNSIGNED NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `video_statistics` CHANGE `favorite_count` `favorite_count` int(10) UNSIGNED NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `video_statistics` CHANGE `dislike_count` `dislike_count` int(10) UNSIGNED NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `video_statistics` CHANGE `like_count` `like_count` int(10) UNSIGNED NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `video_statistics` CHANGE `view_count` `view_count` int(10) UNSIGNED NOT NULL DEFAULT '0'");
        await queryRunner.query("DROP TABLE `settings`");
    }

}
