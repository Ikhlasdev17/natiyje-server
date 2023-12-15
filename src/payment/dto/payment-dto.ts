import {
	IsEnum,
	IsNotEmpty,
	IsOptional,
	IsPhoneNumber,
	IsString,
} from 'class-validator'

export enum PaymentTypes {
	CLICK = 'CLICK',
	PAYME = 'PAYME',
}

export class PaymentCreateDto {
	@IsString()
	@IsPhoneNumber('UZ')
	phone: string

	@IsEnum(PaymentTypes)
	@IsNotEmpty()
	payment_type: PaymentTypes

	@IsString()
	course_id: string

	@IsString()
	@IsOptional()
	coupon: string
}
