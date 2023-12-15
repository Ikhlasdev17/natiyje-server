import { IsNumber, IsString } from 'class-validator'

export class CreateCouponDto {
	@IsString()
	code: string

	@IsString()
	expiresIn: string

	@IsNumber()
	amount: number
}
