import { IsNumber, IsOptional, IsString } from 'class-validator'
import { Type } from 'class-transformer'
import { snakeCase } from 'typeorm/util/StringUtils'

export class AbsoluteSearchDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  readonly page: number = 1
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  readonly count: number = 10
  @IsOptional()
  @IsString()
  readonly sort: string

  get order(): object | undefined {
    const [column, direction] = this.sort ? this.sort.split(' ') : []
    return column ? { [column]: direction.toUpperCase() } : undefined
  }
  get snakeCasedOrder(): object | undefined {
    const [column, direction] = this.sort ? this.sort.split(' ') : []
    return column ? { [snakeCase(column)]: direction.toUpperCase() } : undefined
  }
}
