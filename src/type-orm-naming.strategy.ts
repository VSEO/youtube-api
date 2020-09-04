import { DefaultNamingStrategy } from 'typeorm'
import { snakeCase } from 'typeorm/util/StringUtils'
import * as pluralize from 'pluralize'

export class TypeOrmNamingStrategy extends DefaultNamingStrategy {
  tableName(className, customName): string {
    return customName || pluralize(snakeCase(className))
  }

  columnName(propertyName, customName, embeddedPrefixes): string {
    return snakeCase(embeddedPrefixes.join('_')) + (customName || snakeCase(propertyName))
  }

  relationName(propertyName): string {
    return snakeCase(propertyName)
  }

  joinColumnName(relationName, referencedColumnName): string {
    return snakeCase(pluralize.singular(relationName) + '_' + referencedColumnName)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  joinTableName(firstTableName, secondTableName, firstPropertyName, secondPropertyName): string {
    return snakeCase(firstTableName + '_' + secondTableName)
  }

  joinTableColumnName(tableName, propertyName, columnName): string {
    return snakeCase(pluralize.singular(tableName) + '_' + (columnName || propertyName))
  }

  classTableInheritanceParentColumnName(parentTableName, parentTableIdPropertyName): string {
    return snakeCase(pluralize.singular(parentTableName) + '_' + parentTableIdPropertyName)
  }
}
