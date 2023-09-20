import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Category, CategoryDocument } from './category.model'

@Injectable()
export class CategoryService {
	constructor(
		@InjectModel(Category.name)
		private readonly categoryModel: Model<CategoryDocument>
	) {}

	async createCategory(title: string) {
		const existItem = await this.categoryModel.findOne({ title })
		if (existItem) throw new BadRequestException('Category already exist!')
		const newCategory = await this.categoryModel.create({ title })
		return await newCategory.save()
	}

	async updateCategory(id: string, title: string) {
		const newCategory = await this.categoryModel.findByIdAndUpdate(
			id,
			{
				title,
			},
			{ new: true }
		)
		return newCategory
	}

	async deleteCategory(id: string) {
		const category = await this.categoryModel.findById(id)
		if (category.courses.length !== 0)
			throw new BadRequestException('That category used for course')

		return await category.deleteOne()
	}

	async getCategories() {
		return await this.categoryModel.find()
	}
}
