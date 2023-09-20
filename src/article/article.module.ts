import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from 'src/user/user.model'
import { ArticleController } from './article.controller'
import { Article, ArticleSchema } from './article.model'
import { ArticleService } from './article.service'

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: User.name, schema: UserSchema },
			{ name: Article.name, schema: ArticleSchema },
		]),
	],
	controllers: [ArticleController],
	providers: [ArticleService],
})
export class ArticleModule {}
