import {
	IsEnum,
	IsNotEmpty,
	IsNumber,
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

export class PreparePaymentDto {
	@IsNumber()
	click_trans_id: number | bigint
	@IsString()
	service_id: string
	@IsNumber()
	click_paydoc_id: bigint | number
	@IsString()
	merchant_trans_id: string
	@IsNumber()
	amount: number
	@IsNumber()
	action: number
	@IsNumber()
	error: number
	@IsString()
	error_note: string
	@IsString()
	sign_time: string
	@IsString()
	sign_string: string
}
