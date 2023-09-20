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
import { User } from './decorators/user.decorator'
import { UserDocument } from './user.model'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@HttpCode(200)
	@Get('profile')
	@Auth()
	async getMyProfile(@User('_id') _id: string) {
		return this.userService.profile(_id)
	}

	@HttpCode(200)
	@Put('change-cover')
	@Auth()
	async changeCover(
		@User('_id') _id: string,
		@Body() data: { coverImage: string }
	) {
		return this.userService.changeCover(_id, data.coverImage)
	}

	@HttpCode(200)
	@Put('change-avatar')
	@Auth()
	async avatarCover(
		@User('_id') _id: string,
		@Body() data: { avatar: string }
	) {
		return this.userService.avatarCover(_id, data.avatar)
	}

	@HttpCode(200)
	@Put('update-data')
	@Auth()
	async updateData(
		@User('_id') _id: string,
		@Body() data: { data: UserDocument }
	) {
		return this.userService.updateData(_id, data.data)
	}

	@HttpCode(200)
	@Post('enroll-course/:courseId')
	@Auth()
	async enrollCourse(
		@Param('courseId') courseId: string,
		@User('_id') userId: string
	) {
		return this.userService.enrollCourse(courseId, userId)
	}

	@HttpCode(200)
	@Get('students')
	@Auth('INSTRUCTOR')
	async students() {
		return this.userService.getStudents()
	}
}