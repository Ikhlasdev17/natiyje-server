import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ServeStaticModule } from "@nestjs/serve-static"
import { path } from 'app-root-path'
import { FileController } from './file.controller'
import { File, FileSchema } from './file.model'
import { FileService } from './file.service'


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: `${path}/uploads`,
      serveRoot: "/uploads"
    }),
    MongooseModule.forFeature([
      {name: File.name, schema: FileSchema}
    ])
  ],
  controllers: [FileController],
  providers: [FileService]
})
export class FileModule {}
