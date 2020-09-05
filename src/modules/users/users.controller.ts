import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { UsersService } from '@modules/users/users.service'
import { Role, User } from '@modules/users/entities/user.entity'
import { SearchResultDto } from '@common/dto/search-result.dto'
import { UserSearchDto } from '@modules/users/dto/user-search.dto'
import { UserRegisterDto } from '@modules/users/dto/user-register.dto'
import { UserUpdateDto } from '@modules/users/dto/user-update.dto'
import { AuthGuard } from '@guards/auth.guard'
import { RolesGuard } from '@guards/roles.guard'
import { Roles } from '@decorators/roles.decorator'

@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  @Roles(Role.ADMIN)
  search(@Query() dto: UserSearchDto): Promise<SearchResultDto<User>> {
    return this.service.search(dto)
  }

  @Post()
  @Roles(Role.ADMIN)
  async register(@Body() dto: UserRegisterDto) {
    await this.service.register(dto)
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  async update(@Param('id') id, @Body() dto: UserUpdateDto) {
    await this.service.update(id, dto)
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  async delete(@Param('id') id) {
    await this.service.delete(id)
  }
}
