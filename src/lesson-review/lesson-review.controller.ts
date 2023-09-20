import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { User } from 'src/user/decorators/user.decorator'
import { LessonReviewDto } from './dto/lesson-review.dto'
import { LessonReviewService } from './lesson-review.service'

@Controller('lesson-review')
export class LessonReviewController {
	constructor(private readonly lessonReviewService: LessonReviewService) {}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('create')
	@Auth()
	async createReview(@Body() body: LessonReviewDto, @User('_id') id: string) {
		return this.lessonReviewService.createReview(body, id, body.lessonId)
	}

	@HttpCode(200)
	@Get('find/:lessonId')
	@Auth()
	async getReview(@Param('lessonId') lessonId: string) {
		return this.lessonReviewService.findLessonReviews(lessonId)
	}
}
