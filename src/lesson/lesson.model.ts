import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Schema as SchemaMS } from 'mongoose'
import { LessonReview } from 'src/lesson-review/lesson-review.model'

export type LessonDocument = HydratedDocument<Lesson>

@Schema({ timestamps: true })
export class Lesson {
	@Prop()
	name: string

	@Prop()
	material: string

	@Prop()
	embedVideo: string

	@Prop()
	hour: number

	@Prop()
	minute: number

	@Prop()
	second: number

	@Prop([String])
	completed: string[]

	@Prop([{ type: SchemaMS.Types.ObjectId, ref: 'LessonReview' }])
	lessonReview: LessonReview[]

	@Prop({ default: false })
	isOpen: boolean
}

export const LessonSchema = SchemaFactory.createForClass(Lesson)
