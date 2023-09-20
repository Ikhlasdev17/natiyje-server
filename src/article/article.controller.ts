import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { User } from 'src/user/decorators/user.decorator'
import { ArticleDocument } from './article.model'
import { ArticleService } from './article.service'

@Controller('article')
export class ArticleController {
	constructor(private readonly articleService: ArticleService) {}

	@HttpCode(200)
	@Post('create')
	@Auth()
	async createArticle(
		@User('_id') id: string,
		@Body() article: ArticleDocument
	) {
		return this.articleService.createArticle(article, id)
	}
}
