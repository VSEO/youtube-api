import {MigrationInterface, QueryRunner} from "typeorm";

export class addTableVideoScrapeQueue1599696019285 implements MigrationInterface {
    name = 'addTableVideoScrapeQueue1599696019285'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `video_scrape_queue` (`scheduled_date` date NOT NULL, `video_category_id` int UNSIGNED NOT NULL, `status` enum ('1', '2') NOT NULL DEFAULT '1', `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`scheduled_date`, `video_category_id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `users` DROP COLUMN `role`");
        await queryRunner.query("ALTER TABLE `users` ADD `role` enum ('1', '2') NOT NULL DEFAULT '2'");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `users` DROP COLUMN `role`");
        await queryRunner.query("ALTER TABLE `users` ADD `role` tinyint NOT NULL DEFAULT '2'");
        await queryRunner.query("DROP TABLE `video_scrape_queue`");
    }

}
