import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity, FindConditions,
  UpdateDateColumn
} from 'typeorm'
import { UserSearchDto } from '@modules/users/dto/user-search.dto'
import { SearchResultDto } from '@common/dto/search-result.dto'
import { UserUpdateDto } from '@modules/users/dto/user-update.dto'
import { UserRegisterDto } from '@modules/users/dto/user-register.dto'
import { BadRequestException } from '@nestjs/common'

export enum Role {
  ADMIN = 1,
  USER = 2
}

@Entity('users')
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 31, primary: true, unique: true })
  id: string
  @Column({ type: 'varchar', length: 255 })
  password: string
  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role
  @Column({ type: 'tinyint', default: false, select: false })
  deleted: boolean
  @CreateDateColumn()
  createdAt?: Date
  @UpdateDateColumn()
  updatedAt?: Date

  public static get(id: string): Promise<User> {
    return User.findOne({ where: { id, deleted: false } })
  }
  public static load(id: string): Promise<User> {
    return User.findOneOrFail({ where: { id, deleted: false } })
  }
  public static async search(dto: UserSearchDto): Promise<SearchResultDto<User>> {
    const where: FindConditions<User> = { deleted: false }
    return {
      total: await User.count({ where }),
      data: await User.find({
        skip: dto?.page ? (dto?.page - 1) * dto?.count : undefined,
        take: dto?.count,
        where,
        order: dto?.order
      }),
    }
  }
  static async register(dto: UserRegisterDto): Promise<User> {
    const user = await this.get(dto.id)
    if (user) {
      throw new BadRequestException()
    }
    return dto.create().save()
  }

  update(dto: UserUpdateDto): Promise<User> {
    return dto.modify(this).then((user: User) => user.save())
  }
  delete(): Promise<User> {
    this.deleted = true
    return this.save()
  }
}
