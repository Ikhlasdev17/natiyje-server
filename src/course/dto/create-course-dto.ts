import { IsNumber, IsString } from 'class-validator'

export class CreateCourseDto {
	@IsString()
	title: string
	@IsString()
	description: string
	@IsNumber()
	price: number
	@IsString()
	excerpt: string
	learn: string[]
	requirements: string[]
	tags: string[]
	@IsString()
	level: string
	@IsString()
	image: string
	@IsString()
	embedVideo: string
	@IsString()
	teacher: string
}
