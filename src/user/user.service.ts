import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { AuthService } from 'src/auth/auth.service'
import { Course, CourseDocument } from 'src/course/course.model'
import { SmsService } from 'src/sms/sms.service'
import { CreateUserDto } from './dto/create-user-dto'
import { User, UserDocument, UserRoles } from './user.model'

@Injectable()
export class UserService {
	constructor(
		@InjectModel(User.name) private readonly userModel: Model<UserDocument>,
		@InjectModel(Course.name)
		private readonly courseModel: Model<CourseDocument>,
		private readonly authService: AuthService,
		private readonly smsService: SmsService
	) {}

	async profile(userId: string) {
		const user = await this.userModel.findById(userId)

		if (!user) throw new NotFoundException('User not found!')

		return this.getSpecificUserData(user)
	}

	async changeCover(id: string, coverImage: string) {
		const user = await this.userModel
			.findByIdAndUpdate(
				id,
				{
					$set: { coverImage: coverImage },
				},
				{ new: true }
			)
			.populate([
				{
					path: 'courses',
					model: 'Course',
					populate: {
						path: 'teacher',
						model: 'User',
					},
				},
			])

		return this.getSpecificUserData(user)
	}

	async avatarCover(id: string, avatar: string) {
		const user = await this.userModel
			.findByIdAndUpdate(
				id,
				{
					$set: { avatar: avatar },
				},
				{ new: true }
			)
			.populate([
				{
					path: 'courses',
					model: 'Course',
					populate: {
						path: 'teacher',
						model: 'User',
					},
				},
			])

		return this.getSpecificUserData(user)
	}

	async updateData(id: string, data: UserDocument) {
		const { email, fullName, bio, birthday, address } = data

		const user = await this.userModel
			.findByIdAndUpdate(
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
			.populate({
				path: 'courses',
				model: 'Course',
				select: ['_id', 'title', 'price', 'image', 'author'],
			})

		return this.getSpecificUserData(user)
	}

	async enrollCourse(courseId: string, userId: string) {
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
				select: ['_id', 'title', 'price', 'image'],
			})

		return students.map(item => this.getSpecificUserData(item))
	}

	async getInstructors() {
		const students = await this.userModel
			.find({
				$or: [{ role: 'INSTRUCTOR' }],
			})
			.populate({
				path: 'courses',
				model: 'Course',
				select: ['_id', 'title', 'price'],
			})

		return students.map(item => this.getSpecificUserData(item))
	}

	async getAdmins() {
		const students = await this.userModel
			.find({
				$or: [{ role: 'ADMIN' }],
			})
			.populate({
				path: 'courses',
				model: 'Course',
				select: ['_id', 'title', 'price'],
			})

		return students.map(item => this.getSpecificUserData(item))
	}

	async getUsers(role: UserRoles = 'USER') {
		const users = await this.userModel
			.find({
				role: {
					$in: role.split('|'),
				},
			})
			.populate({
				path: 'courses',
				model: 'Course',
				select: ['_id', 'title', 'price'],
			})

		return users.map(item => this.getSpecificUserData(item))
	}

	async createUserByAdmin(
		fullName: string,
		phone: string,
		password: string,
		role: string
	) {
		const user = await this.authService.isExistUser(phone)

		if (user)
			throw new BadRequestException('User with this phone is already exist!')

		const hashedPass = await this.authService.getHashedPass(password)

		const newUser = await this.userModel.create({
			phone,
			fullName,
			password: hashedPass,
			role,
		})

		await newUser.save()

		await this.smsService.sendSimpleSms(
			phone,
			"Qutliqlaymiz! Natiyje.uz saytinan dizimnen o'tkerildin'iz! \nTelefon: " +
				phone +
				'\nParol: ' +
				password +
				''
		)

		return newUser
	}

	async updateUserByAdmin(data: CreateUserDto, id: string) {
		const user = await this.userModel.findByIdAndUpdate(
			id,
			{
				$set: data,
			},
			{ new: true }
		)

		if (!user) throw new BadRequestException('User not found!')

		return user
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
