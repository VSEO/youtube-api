import { MiddlewareConsumer, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Connection } from 'typeorm'
import { CorsMiddleware } from '@middleware/cors.middleware'
import { SharedModule } from '@shared/shared.module'
import { ConfigService } from '@shared/services/config.service'
import { AuthModule } from '@modules/auth/auth.module'
import { SettingsModule } from '@modules/settings/settings.module'
import { UsersModule } from '@modules/users/users.module'
import { VideosModule } from '@modules/videos/videos.module'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: ConfigService) =>
        configService.typeOrmConfig,
      inject: [ConfigService],
    }),
    AuthModule,
    SettingsModule,
    UsersModule,
    VideosModule
  ]
})
export class AppModule {
  constructor(private readonly connection: Connection) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes('*')
  }
}
