import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Lesson, LessonDocument } from 'src/lesson/lesson.model'
import { User, UserDocument } from 'src/user/user.model'
import { LessonReviewDto } from './dto/lesson-review.dto'
import { LessonReview, LessonReviewDocument } from './lesson-review.model'

@Injectable()
export class LessonReviewService {
	constructor(
		@InjectModel(Lesson.name)
		private readonly lessonModel: Model<LessonDocument>,
		@InjectModel(User.name) private readonly userModel: Model<UserDocument>,
		@InjectModel(LessonReview.name)
		private readonly lessonReviewModel: Model<LessonReviewDocument>
	) {}

	async createReview(data: LessonReviewDto, userId: string, lessonId: string) {
		const author = await this.userModel.findById(userId)
		const lesson = await this.lessonModel.findById(lessonId)

		const review = await this.lessonReviewModel.create({
			text: data.text,
			rate: data.rate,
			author,
			lesson,
		})

		await lesson.updateOne(
			{
				$push: {
					lessonReview: review._id,
				},
			},
			{ new: true }
		)

		return review
	}

	async findLessonReviews(lessonId: string) {
		console.log(lessonId)

		if (lessonId.match(/^[0-9a-fA-F]{24}$/)) {
			const reviews = await this.lessonReviewModel
				.find({ lesson: lessonId })
				.sort({
					createdAt: -1,
				})
				.populate('author', '_id fullName avatar')

			return reviews
		}
		return []
	}
}
