import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '@modules/users/users.service'
import { User } from '@modules/users/entities/user.entity'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validate(id: string, password: string) {
    const user: User = await this.usersService.load(id)
    return user.password === password ? user : null
  }
  async login(user: any) {
    return {
      id: user.id,
      role: user.role,
      token: this.jwtService.sign({ id: user.id, updatedAt: user.updatedAt }),
    }
  }
}
