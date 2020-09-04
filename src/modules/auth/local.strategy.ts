import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { AuthService } from '@modules/auth/auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'id', passwordField: 'password' })
  }

  async validate(id: string, password: string): Promise<any> {
    const user = await this.authService.validate(id, password)
    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}
