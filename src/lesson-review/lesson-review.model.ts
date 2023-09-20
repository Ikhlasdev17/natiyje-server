import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Schema as SchemaMS } from 'mongoose'
import { Lesson } from 'src/lesson/lesson.model'
import { User } from 'src/user/user.model'

export type LessonReviewDocument = HydratedDocument<LessonReview>

@Schema({ timestamps: true })
export class LessonReview {
	@Prop({ type: SchemaMS.Types.ObjectId, ref: 'User' })
	author: User

	@Prop({ type: SchemaMS.Types.ObjectId, ref: 'Lesson' })
	lesson: Lesson

	@Prop()
	text: string

	@Prop()
	rate: number
}

export const LessonReviewSchema = SchemaFactory.createForClass(LessonReview)
