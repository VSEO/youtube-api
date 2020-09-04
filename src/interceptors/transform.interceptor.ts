import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { snakeCase } from 'typeorm/util/StringUtils'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<Response<T>> {
    return next.handle().pipe(map(data => {
      const snakedData = this.toSnakeCase(data)
      return this.isSearchResult(data) ? snakedData : { data: snakedData }
    }))
  }

  private isSearchResult(data: any): boolean {
    return data?.total !== undefined && data?.data !== undefined && Object.keys(data).length === 2
  }

  private toSnakeCase(data: any): any {
    switch (true) {
      case Array.isArray(data):
        return data.map(datum => this.toSnakeCase(datum))
      case Object.prototype.toString.call(data) === "[object Object]":
        return Object.keys(data)
          .reduce((a, c) => Object.assign(a, { [snakeCase(c)]: this.toSnakeCase(data[c]) }), {})
      default:
        return data
    }
  }
}

