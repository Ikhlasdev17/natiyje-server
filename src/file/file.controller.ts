import {
	Controller,
	Get,
	HttpCode,
	Post,
	Query,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { FileService } from './file.service'

@Controller('file')
export class FileController {
	constructor(private readonly fileService: FileService) {}

	@Post('upload')
	@HttpCode(200)
	@Auth()
	@UseInterceptors(FileInterceptor('image'))
	async uploadFile(
		@UploadedFile() file: Express.Multer.File,
		@Query('folder') folder?: string
	) {
		return this.fileService.upload(file, folder)
	}

	@Get('all')
	@HttpCode(200)
	async getAllFiles() {
		return this.fileService.getAllFiles()
	}
}
