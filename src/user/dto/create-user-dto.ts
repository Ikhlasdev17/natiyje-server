import { IsEnum, IsNotEmpty, IsString } from 'class-validator'
import { UserRoles } from '../user.model'

export class CreateUserDto {
	@IsString()
	@IsNotEmpty()
	fullName: string

	@IsString()
	@IsNotEmpty()
	phone: string

	@IsString()
	@IsNotEmpty()
	password: string

	@IsString()
	@IsEnum({
		ADMIN: 'ADMIN',
		CEO: 'CEO',
		USER: 'USER',
		INSTRUCTOR: 'INSTRUCTOR',
	})
	role: UserRoles
}
