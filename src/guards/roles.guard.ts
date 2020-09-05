import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { User } from '@modules/users/entities/user.entity'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly _reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this._reflector.get<number[]>(
      'roles',
      context.getHandler(),
    )

    if (!roles) {
      return true
    }

    const request = context.switchToHttp().getRequest()
    const user = request.user as User

    return roles.includes(user.role)
  }
}
