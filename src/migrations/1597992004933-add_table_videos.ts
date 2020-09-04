import {MigrationInterface, QueryRunner} from "typeorm";

export class addTableVideos1597992004933 implements MigrationInterface {
    name = 'addTableVideos1597992004933'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `videos` (`id` varchar(11) NOT NULL, `title` varchar(255) NOT NULL, `description` text NULL, `channel_id` varchar(24) NOT NULL, `channel_title` varchar(255) NOT NULL, `live_broadcast_content` enum ('live', 'upcoming', 'none') NOT NULL DEFAULT 'none', `published_at` datetime NOT NULL, `thumbnails_default_url` varchar(255) NOT NULL, `thumbnails_default_width` smallint UNSIGNED NOT NULL, `thumbnails_default_height` smallint UNSIGNED NOT NULL, `thumbnails_medium_url` varchar(255) NOT NULL, `thumbnails_medium_width` smallint UNSIGNED NOT NULL, `thumbnails_medium_height` smallint UNSIGNED NOT NULL, `thumbnails_high_url` varchar(255) NOT NULL, `thumbnails_high_width` smallint UNSIGNED NOT NULL, `thumbnails_high_height` smallint UNSIGNED NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `videos`");
    }

}
