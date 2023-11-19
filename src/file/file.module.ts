import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ServeStaticModule } from '@nestjs/serve-static'
import { NestjsFormDataModule } from 'nestjs-form-data'
import { FileController } from './file.controller'
import { File, FileSchema } from './file.model'
import { FileService } from './file.service'

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: `${process.cwd()}/uploads`,
			serveRoot: '/uploads',
		}),
		MongooseModule.forFeature([{ name: File.name, schema: FileSchema }]),
		NestjsFormDataModule,
	],
	controllers: [FileController],
	providers: [FileService],
})
export class FileModule {}
