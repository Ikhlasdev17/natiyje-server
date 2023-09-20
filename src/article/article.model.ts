import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Schema as SchemaMS } from 'mongoose'
import { User } from 'src/user/user.model'

export type ArticleDocument = HydratedDocument<Article>

@Schema({ timestamps: true })
export class Article {
	@Prop({ type: SchemaMS.Types.ObjectId, ref: 'User' })
	author: User

	@Prop()
	title: string

	@Prop()
	excerpt: string

	@Prop()
	description: string

	@Prop({ default: 0 })
	reads: number

	@Prop([{ type: SchemaMS.Types.ObjectId, ref: 'User' }])
	likes: User[]

	@Prop()
	tags: string[]

	@Prop({ default: false })
	isActive: boolean
}

export const ArticleSchema = SchemaFactory.createForClass(Article)
