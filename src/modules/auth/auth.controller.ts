import { Controller, Post, Req, UseGuards } from '@nestjs/common'
import { AuthService } from '@modules/auth/auth.service'
import { AuthGuard } from '@nestjs/passport'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  public signIn(@Req() req) {
    return this.authService.login(req.user)
  }
}
