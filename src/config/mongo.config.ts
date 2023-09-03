import { ConfigService } from '@nestjs/config'
import { MongooseModuleOptions } from '@nestjs/mongoose'

export const getMongoDBConfig = async (configService: ConfigService): Promise<MongooseModuleOptions> => {
  return {
    uri: configService.get("DB_URI"),
    dbName: configService.get("DB_NAME")
  }
}