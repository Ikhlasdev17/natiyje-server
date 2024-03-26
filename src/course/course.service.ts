import {
	BadRequestException,
	ForbiddenException,
	Injectable,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Category, CategoryDocument } from 'src/category/category.model'
import { SectionDocument } from 'src/section/section.model'
import { User, UserDocument } from 'src/user/user.model'
import { Course, CourseDocument } from './course.model'
import { CreateCourseDto } from './dto/create-course-dto'

@Injectable()
export class CourseService {
	constructor(
		@InjectModel(Course.name)
		private readonly courseModel: Model<CourseDocument>,
		@InjectModel(User.name) private readonly userModel: Model<UserDocument>,
		@InjectModel(Category.name)
		private readonly categoryModel: Model<CategoryDocument>
	) {}

	async create(body: CreateCourseDto, _id: string) {
		const author = await this.userModel.findById(_id)
		const teacher = await this.userModel.findById(body.teacher)
		// const category = await this.categoryModel.findById(body.category || '')

		const newCourse = await this.courseModel.create({
			...body,
			author: author._id,
			category: '1',
			teacher: teacher._id,
		})

		await newCourse.save()

		return newCourse
	}

	async update(body: CreateCourseDto, courseId: string) {
		const newCourse = await this.courseModel.findByIdAndUpdate(courseId, body, {
			new: true,
		})

		return newCourse
	}

	async getAllCourse() {
		const courses = await this.courseModel.find().populate([
			{
				path: 'author',
				select: 'fullName _id avatar',
			},
			{
				path: 'teacher',
				select: 'fullName _id avatar',
			},
		])

		return courses
	}

	async activateCourse(courseId: string) {
		const course = this.courseModel
			.findByIdAndUpdate(
				courseId,
				{
					$set: { isActive: true },
				},
				{ new: true }
			)
			.exec()

		return course
	}

	async unActivateCourse(courseId: string) {
		const course = this.courseModel
			.findByIdAndUpdate(
				courseId,
				{
					$set: { isActive: false },
				},
				{ new: true }
			)
			.exec()

		return course
	}

	async getSingleCourse(id: string) {
		const course = this.courseModel.findById(id)

		if (!course) throw new BadRequestException('Course not found!')

		return course
	}

	async getSingleCourseWithSlug(slug: string) {
		const course = await this.courseModel
			.findOne({ slug: slug })
			.populate('author', '_id fullName avatar')
			.populate({
				path: 'sections',
				populate: {
					path: 'lessons',
				},
			})

		if (!course) throw new BadRequestException('Course not found!')

		const data = {
			title: course.title,
			description: course.description,
			author: course.author,
			price: course.price,
			excerpt: course.excerpt,
			learn: course.learn,
			requirements: course.requirements,
			tags: course.tags,
			level: course.level,
			isActive: course.isActive,
			embedVideo: course.embedVideo,
			slug: course.slug,
			image: course.image,
			_id: course._id,
			teacher: course.teacher,
			sections: course.sections.map((item: SectionDocument) => ({
				title: item.title,
				_id: item._id,
				lessons: item.lessons.map(lesson => {
					if (lesson.isOpen) {
						return lesson
					} else {
						return {
							name: lesson.name,
							minute: lesson.minute,
							hour: lesson.hour,
							second: lesson.second,
						}
					}
				}),
			})),
		}

		return data
	}

	async deleteCourse(courseId: string) {
		await this.courseModel.findByIdAndRemove(courseId)
		return 'success'
	}

	async fullCourse(slug: string, userId: string) {
		const user = await this.userModel.findById(userId)

		// const course = await this.courseModel.findOne({ slug }).populate([
		// 	{
		// 		path: 'sections',
		// 		model: 'Section',
		// 	},
		// 	{
		// 		path: 'lessons',
		// 		model: 'Lesson',
		// 	},
		// 	{
		// 		path: 'teacher',
		// 		model: 'User',
		// 	},
		// ])

		const course = await this.courseModel.findOne({ slug }).populate({
			path: 'sections',
			populate: {
				path: 'lessons',
				model: 'Lesson',
				// populate: {
				// 	path: 'teacher',
				// 	model: 'User',
				// },
			},
		})

		if (!course) return new BadRequestException('Course not found!')

		if (
			user.courses.findIndex(item => String(item) === String(course._id)) === -1
		) {
			return new ForbiddenException('Course not enrolled!')
		}

		return course
	}

	async getCourseStudents(courseId: string) {
		const courseUsers = await this.userModel.find({
			courses: courseId,
		})

		return courseUsers
	}

	async addUserToCourse(courseId: string, userId: string) {
		const course = await this.courseModel.findById(courseId)

		const user = await this.userModel.findById(userId)

		if (
			user.courses.findIndex(item => String(item) === String(course._id)) === -1
		) {
			await user.updateOne(
				{
					$push: {
						courses: course,
					},
				},
				{ new: true }
			)
			return course
		} else {
			return new BadRequestException('Course already enroled!')
		}
	}
}
