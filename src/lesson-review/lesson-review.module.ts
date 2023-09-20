import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Lesson, LessonSchema } from 'src/lesson/lesson.model'
import { User, UserSchema } from 'src/user/user.model'
import { LessonReviewController } from './lesson-review.controller'
import { LessonReview, LessonReviewSchema } from './lesson-review.model'
import { LessonReviewService } from './lesson-review.service'

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: LessonReview.name, schema: LessonReviewSchema },
			{ name: User.name, schema: UserSchema },
			{ name: Lesson.name, schema: LessonSchema },
		]),
	],
	controllers: [LessonReviewController],
	providers: [LessonReviewService],
})
export class LessonReviewModule {}
