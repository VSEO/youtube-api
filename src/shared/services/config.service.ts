import * as config from 'config'
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions'
import { TypeOrmNamingStrategy } from '../../type-orm-naming.strategy'

export class ConfigService {
  public get(key: string): any {
    return key.split('.').reduce((_c, _k) => _c[_k], config)
  }

  public getNumber(key: string): number {
    return Number(this.get(key))
  }

  public isDevelopment(): boolean {
    return process.env.NODE_ENV === 'development'
  }
  public isProduction(): boolean {
    return process.env.NODE_ENV === 'production'
  }

  get typeOrmConfig(): MysqlConnectionOptions {
    return {
      entities: [__dirname + '/../../modules/**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/../../migrations/**/*{.ts,.js}'],
      type: 'mysql',
      host: this.get('mysql.host'),
      port: this.getNumber('mysql.port'),
      username: this.get('mysql.username'),
      password: this.get('mysql.password'),
      database: this.get('mysql.database'),
      migrationsRun: true,
      logging: this.get('mysql.logging'),
      synchronize: this.get('mysql.synchronize'),
      namingStrategy: new TypeOrmNamingStrategy(),
      cli: {
        migrationsDir: 'src/migrations'
      }
    }
  }
}
