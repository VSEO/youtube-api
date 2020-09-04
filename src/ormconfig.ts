import { ConnectionOptions } from 'typeorm'
import { ConfigService } from '@shared/services/config.service'

const service: ConfigService = new ConfigService()
const ormconfig: ConnectionOptions = service.typeOrmConfig

module.exports = ormconfig
