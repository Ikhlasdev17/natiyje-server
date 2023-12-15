import { Prop, Schema } from '@nestjs/mongoose'
import { Schema as SchemaMS } from 'mongoose'
import { Course } from 'src/course/course.model'
import { PaymentTypes } from './dto/payment-dto'

export enum PaymentStatuses {
	INPUT = 'input',
	WAITING = 'waiting',
	PREAUTH = 'preauth',
	CONFIRMED = 'confirmed',
	REJECTED = 'rejected',
	REFUNDED = 'refunded',
	ERROR = 'error',
}

@Schema({ timestamps: true })
export class Payment {
	@Prop({ type: 'enum', default: PaymentTypes.CLICK })
	payment_type: PaymentTypes

	@Prop({ type: 'enum', default: PaymentStatuses.INPUT })
	status: PaymentStatuses

	@Prop()
	amount: string

	@Prop()
	merchant_trans_id: string

	@Prop([{ type: SchemaMS.Types.ObjectId, ref: 'Course' }])
	course_id: Course
}
