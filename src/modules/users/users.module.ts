import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '@modules/users/entities/user.entity'
import { UsersService } from '@modules/users/users.service'
import { UsersController } from '@modules/users/users.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  exports: [UsersService],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
