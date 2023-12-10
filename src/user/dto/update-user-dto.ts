import { IsEnum, IsOptional } from 'class-validator'
import { UserRoles } from '../user.model'

export class UpdateUserDto {
	@IsOptional()
	fullName: string

	@IsOptional()
	phone: string

	@IsOptional()
	password: string

	@IsOptional()
	@IsEnum({
		ADMIN: 'ADMIN',
		CEO: 'CEO',
		USER: 'USER',
		INSTRUCTOR: 'INSTRUCTOR',
	})
	role: UserRoles
}
