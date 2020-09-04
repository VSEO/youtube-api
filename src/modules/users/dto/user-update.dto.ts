import { IsNotEmpty, IsString, MaxLength } from 'class-validator'
import { Role, User } from '@modules/users/entities/user.entity'

export class UserUpdateDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(31)
  readonly password?: string
  @IsNotEmpty()
  readonly role: Role

  async modify(user: User): Promise<User> {
    user.password = this.password
    user.role = this.role
    return user
  }
}
