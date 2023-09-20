import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CategoryService } from './category.service'
import { CategoryDto } from './dto/category.dto'

@Controller('category')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Post('create')
	@Auth('INSTRUCTOR')
	@HttpCode(200)
	async createCategory(@Body() body: CategoryDto) {
		return this.categoryService.createCategory(body.title)
	}

	@Put('update/:id')
	@Auth('INSTRUCTOR')
	@HttpCode(200)
	async updateCategory(@Body() body: CategoryDto, @Param('id') id: string) {
		return this.categoryService.updateCategory(id, body.title)
	}

	@Put('delete/:id')
	@Auth('INSTRUCTOR')
	@HttpCode(200)
	async deleteCategory(@Param('id') id: string) {
		return this.categoryService.deleteCategory(id)
	}

	@Get('all')
	@HttpCode(200)
	async getAllCategory() {
		return this.categoryService.getCategories()
	}
}
