import {MigrationInterface, QueryRunner} from "typeorm";

export class addTableVideoCategoriesAndVideoStatistics1598697791902 implements MigrationInterface {
    name = 'addTableVideoCategoriesAndVideoStatistics1598697791902'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `video_statistics` (`id` int NOT NULL AUTO_INCREMENT, `view_count` int UNSIGNED NOT NULL DEFAULT 0, `like_count` int UNSIGNED NOT NULL DEFAULT 0, `dislike_count` int UNSIGNED NOT NULL DEFAULT 0, `favorite_count` int UNSIGNED NOT NULL DEFAULT 0, `comment_count` int UNSIGNED NOT NULL DEFAULT 0, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `video_id` varchar(11) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `video_categories` (`id` int UNSIGNED NOT NULL, `title` varchar(255) NOT NULL, `assignable` tinyint NOT NULL DEFAULT 0, `channel_id` varchar(255) NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `videos` ADD `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `videos` ADD `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `videos` ADD `video_category_id` int UNSIGNED NULL");
        await queryRunner.query("ALTER TABLE `videos` CHANGE `thumbnails_default_width` `thumbnails_default_width` smallint UNSIGNED NOT NULL");
        await queryRunner.query("ALTER TABLE `videos` CHANGE `thumbnails_default_height` `thumbnails_default_height` smallint UNSIGNED NOT NULL");
        await queryRunner.query("ALTER TABLE `videos` CHANGE `thumbnails_medium_width` `thumbnails_medium_width` smallint UNSIGNED NOT NULL");
        await queryRunner.query("ALTER TABLE `videos` CHANGE `thumbnails_medium_height` `thumbnails_medium_height` smallint UNSIGNED NOT NULL");
        await queryRunner.query("ALTER TABLE `videos` CHANGE `thumbnails_high_width` `thumbnails_high_width` smallint UNSIGNED NOT NULL");
        await queryRunner.query("ALTER TABLE `videos` CHANGE `thumbnails_high_height` `thumbnails_high_height` smallint UNSIGNED NOT NULL");
        await queryRunner.query("ALTER TABLE `video_statistics` ADD CONSTRAINT `FK_e77223e6ef4ada84978c0d6dc86` FOREIGN KEY (`video_id`) REFERENCES `videos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `videos` ADD CONSTRAINT `FK_821c69129852706ec564167b1fb` FOREIGN KEY (`video_category_id`) REFERENCES `video_categories`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `videos` DROP FOREIGN KEY `FK_821c69129852706ec564167b1fb`");
        await queryRunner.query("ALTER TABLE `video_statistics` DROP FOREIGN KEY `FK_e77223e6ef4ada84978c0d6dc86`");
        await queryRunner.query("ALTER TABLE `videos` CHANGE `thumbnails_high_height` `thumbnails_high_height` smallint(5) UNSIGNED NOT NULL");
        await queryRunner.query("ALTER TABLE `videos` CHANGE `thumbnails_high_width` `thumbnails_high_width` smallint(5) UNSIGNED NOT NULL");
        await queryRunner.query("ALTER TABLE `videos` CHANGE `thumbnails_medium_height` `thumbnails_medium_height` smallint(5) UNSIGNED NOT NULL");
        await queryRunner.query("ALTER TABLE `videos` CHANGE `thumbnails_medium_width` `thumbnails_medium_width` smallint(5) UNSIGNED NOT NULL");
        await queryRunner.query("ALTER TABLE `videos` CHANGE `thumbnails_default_height` `thumbnails_default_height` smallint(5) UNSIGNED NOT NULL");
        await queryRunner.query("ALTER TABLE `videos` CHANGE `thumbnails_default_width` `thumbnails_default_width` smallint(5) UNSIGNED NOT NULL");
        await queryRunner.query("ALTER TABLE `videos` DROP COLUMN `video_category_id`");
        await queryRunner.query("ALTER TABLE `videos` DROP COLUMN `updated_at`");
        await queryRunner.query("ALTER TABLE `videos` DROP COLUMN `created_at`");
        await queryRunner.query("DROP TABLE `video_categories`");
        await queryRunner.query("DROP TABLE `video_statistics`");
    }

}
