import { IsNotEmpty, IsString } from 'class-validator'

export class UpdatePasswordDto {
	@IsString()
	@IsNotEmpty()
	phone: string

	@IsString()
	@IsNotEmpty()
	password: string
}
