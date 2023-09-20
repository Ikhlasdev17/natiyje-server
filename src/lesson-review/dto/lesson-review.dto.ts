import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class LessonReviewDto {
	@IsString()
	@IsNotEmpty()
	text: string

	@IsString()
	lessonId: string

	@IsNumber()
	rate: number
}
