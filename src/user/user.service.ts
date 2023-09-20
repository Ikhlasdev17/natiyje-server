import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Course, CourseDocument } from 'src/course/course.model'
import { User, UserDocument } from './user.model'

@Injectable()
export class UserService {
	constructor(
		@InjectModel(User.name) private readonly userModel: Model<UserDocument>,
		@InjectModel(Course.name)
		private readonly courseModel: Model<CourseDocument>
	) {}

	async profile(userId: string) {
		const user = await this.userModel.findById(userId)

		if (!user) throw new NotFoundException('User not found!')

		return this.getSpecificUserData(user)
	}

	async changeCover(id: string, coverImage: string) {
		const user = await this.userModel.findByIdAndUpdate(
			id,
			{
				$set: { coverImage: coverImage },
			},
			{ new: true }
		)

		return this.getSpecificUserData(user)
	}

	async avatarCover(id: string, avatar: string) {
		const user = await this.userModel.findByIdAndUpdate(
			id,
			{
				$set: { avatar: avatar },
			},
			{ new: true }
		)

		return this.getSpecificUserData(user)
	}

	async updateData(id: string, data: UserDocument) {
		const { email, fullName, bio, birthday, address } = data

		const user = await this.userModel.findByIdAndUpdate(
			id,
			{
				$set: {
					email,
					fullName,
					bio,
					birthday,
					address,
				},
			},
			{ new: true }
		)

		return this.getSpecificUserData(user)
	}

	async enrollCourse(courseId: string, userId: string) {
		const course = await this.courseModel.findById(courseId)

		const user = await this.userModel.findById(userId)

		console.log(course)
		console.log(user)

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
			return this.getSpecificUserData(await user.save())
		} else {
			return new BadRequestException('Course already enroled!')
		}
	}

	async getStudents() {
		const students = await this.userModel
			.find({
				$or: [{ role: 'USER' }, { role: undefined }],
			})
			.populate({
				path: 'courses',
				model: 'Course',
				select: ['_id', 'title', 'price'],
			})

		return students.map(item => this.getSpecificUserData(item))
	}

	getSpecificUserData(user: UserDocument) {
		return {
			fullName: user.fullName,
			email: user.email,
			phone: user.phone,
			role: user.role,
			avatar: user.avatar,
			courses: user.courses || [],
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
			coverImage: user.coverImage,
			birthday: user.birthday,
			bio: user.bio,
			address: user.address,
			_id: user._id,
		}
	}
}
