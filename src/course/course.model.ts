import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Schema as SchemaMS } from 'mongoose'
import { Section } from 'src/section/section.model'
import { User } from 'src/user/user.model'

export type CourseDocument = HydratedDocument<Course>

@Schema({ timestamps: true })
export class Course {
	@Prop()
	title: string

	@Prop()
	description: string

	@Prop([{ type: SchemaMS.Types.ObjectId, ref: 'Section' }])
	sections: Section[]

	@Prop()
	price: number

	@Prop({ type: SchemaMS.Types.ObjectId, ref: 'User' })
	author: User

	@Prop()
	excerpt: string

	@Prop([String])
	learn: string[]

	@Prop([String])
	requirements: string[]

	@Prop([String])
	tags: string[]

	@Prop()
	level: string

	@Prop()
	category: string

	@Prop()
	image: string

	@Prop({ default: false })
	isActive: boolean

	@Prop()
	embedVideo: string

	@Prop()
	slug: string
}

export const CourseSchema = SchemaFactory.createForClass(Course)
