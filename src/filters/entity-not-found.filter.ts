import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common'
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError'
import { Response } from 'express'

@Catch(EntityNotFoundError)
export class EntityNotFoundFilter implements ExceptionFilter {
  catch(exception: EntityNotFoundError, host: ArgumentsHost): any {
    const context = host.switchToHttp()
    const response = context.getResponse<Response>()

    response.status(HttpStatus.NOT_FOUND).json({ message: exception.message })
  }
}
