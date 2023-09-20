import {
	Body,
	Controller,
	HttpCode,
	Param,
	Post,
	Put,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { LessonCreateDto } from './dto/lesson-dto'
import { LessonService } from './lesson.service'

@Controller('lesson')
export class LessonController {
	constructor(private readonly lessonService: LessonService) {}

	@HttpCode(200)
	@Post('create/:sectionId')
	@Auth('INSTRUCTOR')
	@UsePipes(new ValidationPipe())
	async createLesson(
		@Body() body: LessonCreateDto,
		@Param('sectionId') sectionId: string
	) {
		return this.lessonService.createLesson(body, sectionId)
	}

	@HttpCode(200)
	@Put('update/:lessonId/:sectionId')
	@Auth('INSTRUCTOR')
	@UsePipes(new ValidationPipe())
	async updateLesson(
		@Body() body: LessonCreateDto,
		@Param('lessonId') lessonId: string,
		@Param('sectionId') sectionId: string
	) {
		return this.lessonService.updateLesson(body, lessonId, sectionId)
	}

	@HttpCode(200)
	@Put('change-position/:sectionId')
	@Auth('INSTRUCTOR')
	async changeLessonPosition(
		@Param('sectionId') sectionId: string,
		@Body() body: { lessons: string[] }
	) {
		return this.lessonService.changeLessonPosition(sectionId, body.lessons)
	}

	@HttpCode(200)
	@Put('open/:lessonId')
	@Auth('INSTRUCTOR')
	async openLessonSource(@Param('lessonId') lessonId: string) {
		return this.lessonService.openLessonSource(lessonId)
	}

	@HttpCode(200)
	@Put('close/:lessonId')
	@Auth('INSTRUCTOR')
	async closeLessonSource(@Param('lessonId') lessonId: string) {
		return this.lessonService.closeLessonSource(lessonId)
	}
}
