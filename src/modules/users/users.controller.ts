import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { UsersService } from '@modules/users/users.service'
import { User } from '@modules/users/entities/user.entity'
import { SearchResultDto } from '@common/dto/search-result.dto'
import { UserSearchDto } from '@modules/users/dto/user-search.dto'
import { UserRegisterDto } from '@modules/users/dto/user-register.dto'
import { UserUpdateDto } from '@modules/users/dto/user-update.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  search(@Query() dto: UserSearchDto): Promise<SearchResultDto<User>> {
    return this.service.search(dto)
  }

  @Post()
  async register(@Body() dto: UserRegisterDto) {
    await this.service.register(dto)
  }

  @Patch(':id')
  async update(@Param('id') id, @Body() dto: UserUpdateDto) {
    await this.service.update(id, dto)
  }

  @Delete(':id')
  async delete(@Param('id') id) {
    await this.service.delete(id)
  }
}
