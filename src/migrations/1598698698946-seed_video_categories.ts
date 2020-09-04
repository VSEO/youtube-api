import { MigrationInterface, QueryRunner } from "typeorm"
import { VideoCategory } from '@modules/videos/entities/video-category.entity'
import { VideoCategoryRegisterDto } from '@modules/videos/dto/video-category-register.dto'

export class seedVideoCategories1598698698946 implements MigrationInterface {
  name = 'seedVideoCategories1598698698946'

  public async up(queryRunner: QueryRunner): Promise<any> {
    const seeds = [
      {
        id: 1,
        title: "映画とアニメ",
        assignable: true,
        channelId: "UCBR8-60-B28hp2BmDPdntcQ"
      },
      {
        id: 2,
        title: "自動車と乗り物",
        assignable: true,
        channelId: "UCBR8-60-B28hp2BmDPdntcQ"
      },
      {
        id: 10,
        title: "音楽",
        assignable: true,
        channelId: "UCBR8-60-B28hp2BmDPdntcQ"
      },
      {
        id: 15,
        title: "ペットと動物",
        assignable: true,
        channelId: "UCBR8-60-B28hp2BmDPdntcQ"
      },
      {
        id: 17,
        title: "スポーツ",
        assignable: true,
        channelId: "UCBR8-60-B28hp2BmDPdntcQ"
      },
      {
        id: 18,
        title: "ショート ムービー",
        assignable: false,
        channelId: "UCBR8-60-B28hp2BmDPdntcQ"
      },
      {
        id: 19,
        title: "旅行とイベント",
        assignable: true,
        channelId: "UCBR8-60-B28hp2BmDPdntcQ"
      },
      {
        id: 20,
        title: "ゲーム",
        assignable: true,
        channelId: "UCBR8-60-B28hp2BmDPdntcQ"
      },
      {
        id: 21,
        title: "動画ブログ",
        assignable: false,
        channelId: "UCBR8-60-B28hp2BmDPdntcQ"
      },
      {
        id: 22,
        title: "ブログ",
        assignable: true,
        channelId: "UCBR8-60-B28hp2BmDPdntcQ"
      },
      {
        id: 23,
        title: "コメディー",
        assignable: true,
        channelId: "UCBR8-60-B28hp2BmDPdntcQ"
      },
      {
        id: 24,
        title: "エンターテイメント",
        assignable: true,
        channelId: "UCBR8-60-B28hp2BmDPdntcQ"
      },
      {
        id: 25,
        title: "ニュースと政治",
        assignable: true,
        channelId: "UCBR8-60-B28hp2BmDPdntcQ"
      },
      {
        id: 26,
        title: "ハウツーとスタイル",
        assignable: true,
        channelId: "UCBR8-60-B28hp2BmDPdntcQ"
      },
      {
        id: 27,
        title: "教育",
        assignable: true,
        channelId: "UCBR8-60-B28hp2BmDPdntcQ"
      },
      {
        id: 28,
        title: "科学と技術",
        assignable: true,
        channelId: "UCBR8-60-B28hp2BmDPdntcQ"
      },
      {
        id: 30,
        title: "映画",
        assignable: false,
        channelId: "UCBR8-60-B28hp2BmDPdntcQ"
      },
      {
        id: 31,
        title: "アニメ",
        assignable: false,
        channelId: "UCBR8-60-B28hp2BmDPdntcQ"
      },
      {
        id: 32,
        title: "アクション/アドベンチャー",
        assignable: false,
        channelId: "UCBR8-60-B28hp2BmDPdntcQ"
      },
      {
        id: 33,
        title: "クラシック",
        assignable: false,
        channelId: "UCBR8-60-B28hp2BmDPdntcQ"
      },
      {
        id: 34,
        title: "コメディー",
        assignable: false,
        channelId: "UCBR8-60-B28hp2BmDPdntcQ"
      },
      {
        id: 35,
        title: "ドキュメンタリー",
        assignable: false,
        channelId: "UCBR8-60-B28hp2BmDPdntcQ"
      },
      {
        id: 36,
        title: "ドラマ",
        assignable: false,
        channelId: "UCBR8-60-B28hp2BmDPdntcQ"
      },
      {
        id: 37,
        title: "家族向け",
        assignable: false,
        channelId: "UCBR8-60-B28hp2BmDPdntcQ"
      },
      {
        id: 38,
        title: "海外",
        assignable: false,
        channelId: "UCBR8-60-B28hp2BmDPdntcQ"
      },
      {
        id: 39,
        title: "ホラー",
        assignable: false,
        channelId: "UCBR8-60-B28hp2BmDPdntcQ"
      },
      {
        id: 40,
        title: "SF/ファンタジー",
        assignable: false,
        channelId: "UCBR8-60-B28hp2BmDPdntcQ"
      },
      {
        id: 41,
        title: "サスペンス",
        assignable: false,
        channelId: "UCBR8-60-B28hp2BmDPdntcQ"
      },
      {
        id: 42,
        title: "短編",
        assignable: false,
        channelId: "UCBR8-60-B28hp2BmDPdntcQ"
      },
      {
        id: 43,
        title: "番組",
        assignable: false,
        channelId: "UCBR8-60-B28hp2BmDPdntcQ"
      },
      {
        id: 44,
        title: "予告編",
        assignable: false,
        channelId: "UCBR8-60-B28hp2BmDPdntcQ"
      }
    ]
    for (const seed of seeds) {
      await VideoCategory.register(new VideoCategoryRegisterDto(seed))
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    // do nothing
  }

}
