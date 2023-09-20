import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Schema as SchemaMS } from 'mongoose'
import { Course } from 'src/course/course.model'

export type CategoryDocument = HydratedDocument<Category>

@Schema({ timestamps: true })
export class Category {
	@Prop({ unique: true })
	title: string

	@Prop([{ type: SchemaMS.Types.ObjectId, ref: 'Course' }])
	courses: Course[]
}

export const CategorySchema = SchemaFactory.createForClass(Category)
