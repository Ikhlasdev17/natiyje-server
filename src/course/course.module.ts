import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Category, CategorySchema } from 'src/category/category.model'
import { User, UserSchema } from 'src/user/user.model'
import { CourseController } from './course.controller'
import { Course, CourseSchema } from './course.model'
import { CourseService } from './course.service'

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Course.name, schema: CourseSchema },
			{ name: User.name, schema: UserSchema },
			{ name: Category.name, schema: CategorySchema },
		]),
	],
	controllers: [CourseController],
	providers: [CourseService],
})
export class CourseModule {}
