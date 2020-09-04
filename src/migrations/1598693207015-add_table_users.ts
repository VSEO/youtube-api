import {MigrationInterface, QueryRunner} from "typeorm";

export class addTableUsers1598693207015 implements MigrationInterface {
    name = 'addTableUsers1598693207015'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `users` (`id` varchar(31) NOT NULL, `password` varchar(255) NOT NULL, `role` tinyint NOT NULL DEFAULT 2, `deleted` tinyint NOT NULL DEFAULT 0, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_a3ffb1c0c8416b9fc6f907b743` (`id`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `videos` CHANGE `thumbnails_default_width` `thumbnails_default_width` smallint UNSIGNED NOT NULL");
        await queryRunner.query("ALTER TABLE `videos` CHANGE `thumbnails_default_height` `thumbnails_default_height` smallint UNSIGNED NOT NULL");
        await queryRunner.query("ALTER TABLE `videos` CHANGE `thumbnails_medium_width` `thumbnails_medium_width` smallint UNSIGNED NOT NULL");
        await queryRunner.query("ALTER TABLE `videos` CHANGE `thumbnails_medium_height` `thumbnails_medium_height` smallint UNSIGNED NOT NULL");
        await queryRunner.query("ALTER TABLE `videos` CHANGE `thumbnails_high_width` `thumbnails_high_width` smallint UNSIGNED NOT NULL");
        await queryRunner.query("ALTER TABLE `videos` CHANGE `thumbnails_high_height` `thumbnails_high_height` smallint UNSIGNED NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `videos` CHANGE `thumbnails_high_height` `thumbnails_high_height` smallint(5) UNSIGNED NOT NULL");
        await queryRunner.query("ALTER TABLE `videos` CHANGE `thumbnails_high_width` `thumbnails_high_width` smallint(5) UNSIGNED NOT NULL");
        await queryRunner.query("ALTER TABLE `videos` CHANGE `thumbnails_medium_height` `thumbnails_medium_height` smallint(5) UNSIGNED NOT NULL");
        await queryRunner.query("ALTER TABLE `videos` CHANGE `thumbnails_medium_width` `thumbnails_medium_width` smallint(5) UNSIGNED NOT NULL");
        await queryRunner.query("ALTER TABLE `videos` CHANGE `thumbnails_default_height` `thumbnails_default_height` smallint(5) UNSIGNED NOT NULL");
        await queryRunner.query("ALTER TABLE `videos` CHANGE `thumbnails_default_width` `thumbnails_default_width` smallint(5) UNSIGNED NOT NULL");
        await queryRunner.query("DROP INDEX `IDX_a3ffb1c0c8416b9fc6f907b743` ON `users`");
        await queryRunner.query("DROP TABLE `users`");
    }

}
