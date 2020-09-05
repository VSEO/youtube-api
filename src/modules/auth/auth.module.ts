import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '@shared/services/config.service'
import { AuthController } from '@modules/auth/auth.controller'
import { AuthService } from '@modules/auth/auth.service'
import { LocalStrategy } from '@modules/auth/local.strategy'
import { JwtStrategy } from '@modules/auth/jwt.strategy'
import { UsersModule } from '@modules/users/users.module'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secretOrPrivateKey: configService.get('auth.secret'),
      }),
      inject: [ConfigService],
    }),
    UsersModule
  ],
  exports: [PassportModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy]
})
export class AuthModule {}
