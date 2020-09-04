import { IsNotEmpty, IsString, MaxLength } from 'class-validator'
import { Role, User } from '@modules/users/entities/user.entity'

export class UserRegisterDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(31)
  readonly id: string
  @IsNotEmpty()
  @IsString()
  @MaxLength(31)
  readonly password: string
  @IsNotEmpty()
  readonly role: Role

  constructor(init?: Partial<UserRegisterDto>) {
    Object.assign(this, init)
  }

  public create(): User {
    return User.create({
      id: this.id,
      password: this.password,
      role: this.role
    })
  }
}
