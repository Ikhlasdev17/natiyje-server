import { IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateCouponDto {
	@IsString()
	@IsOptional()
	code: string

	@IsString()
	@IsOptional()
	expiresIn: string

	@IsNumber()
	@IsOptional()
	amount: number
}
