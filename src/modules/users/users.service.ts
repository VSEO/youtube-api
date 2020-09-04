import { Injectable } from '@nestjs/common'
import { EntityManager, Transaction, TransactionManager } from 'typeorm'
import { InjectEntityManager } from '@nestjs/typeorm'
import { User } from '@modules/users/entities/user.entity'
import { SearchResultDto } from '@common/dto/search-result.dto'
import { UserSearchDto } from '@modules/users/dto/user-search.dto'
import { UserRegisterDto } from '@modules/users/dto/user-register.dto'
import { UserUpdateDto } from '@modules/users/dto/user-update.dto'

@Injectable()
export class UsersService {
  constructor(@InjectEntityManager() private readonly entityManager: EntityManager) {}

  public load(id: string): Promise<User> {
    return User.load(id)
  }
  public search(dto: UserSearchDto): Promise<SearchResultDto<User>> {
    return User.search(dto)
  }
  @Transaction()
  async register(dto: UserRegisterDto, @TransactionManager() manager?: EntityManager): Promise<User> {
    return User.register(dto)
  }
  @Transaction()
  async update(id: string, dto: UserUpdateDto, @TransactionManager() manager?: EntityManager): Promise<User> {
    return User.load(id).then(user => user.update(dto))
  }
  @Transaction()
  async delete(id: string, @TransactionManager() manager?: EntityManager): Promise<User> {
    return User.load(id).then(user => user.delete())
  }
}
