import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User, UserDocument } from 'src/user/user.model'
import { Article, ArticleDocument } from './article.model'

@Injectable()
export class ArticleService {
	constructor(
		@InjectModel(Article.name)
		private readonly articleModel: Model<ArticleDocument>,
		@InjectModel(User.name)
		private readonly userModel: Model<UserDocument>
	) {}

	async createArticle(article: ArticleDocument, userID: string) {
		const author = await this.userModel.findById(userID)

		const newArticle = await this.articleModel.create({
			...article,
			author: author,
		})

		return newArticle
	}
}
