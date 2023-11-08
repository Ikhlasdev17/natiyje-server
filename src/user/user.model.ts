import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Schema as SchemaMS } from 'mongoose'
import { Article } from 'src/article/article.model'
import { Course } from 'src/course/course.model'

export type UserDocument = HydratedDocument<User>

export type UserRoles = 'USER' | 'INSTRUCTOR' | 'ADMIN' | 'CEO'

import * as moongoosePaginate from 'mongoose-paginate'

@Schema({ timestamps: true })
export class User {
	@Prop({ required: true })
	fullName: string

	@Prop({ required: true, unique: true })
	phone: string

	@Prop({ required: true, minlength: 6 })
	password: string

	@Prop()
	email: string

	@Prop()
	avatar: string

	@Prop({ default: '' })
	address: string

	@Prop({ default: 'USER' })
	role: UserRoles

	@Prop([{ type: SchemaMS.Types.ObjectId, ref: 'Course', unique: true }])
	courses: Course[]

	@Prop({ default: null })
	coverImage: string

	@Prop({ default: '' })
	birthday: string

	@Prop({ default: '' })
	bio: string

	@Prop({ type: SchemaMS.Types.ObjectId, ref: 'Article' })
	articles: Article[]

	@Prop({ default: 0 })
	balance: number

	@Prop()
	createdAt: Date

	@Prop()
	updatedAt: Date
}

const UserSchema = SchemaFactory.createForClass(User)
UserSchema.plugin(moongoosePaginate)

export { UserSchema }
