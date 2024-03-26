import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Schema as SchemaMS } from 'mongoose'
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

export type PaymentDocument = HydratedDocument<Payment>

@Schema({ timestamps: true })
export class Payment {
	@Prop({ default: PaymentTypes.CLICK })
	payment_type: PaymentTypes

	@Prop({
		type: String,
		enum: PaymentStatuses,
		default: PaymentStatuses.INPUT,
	})
	status: PaymentStatuses

	@Prop()
	amount: string

	@Prop()
	merchant_trans_id: string

	@Prop([{ type: SchemaMS.Types.ObjectId, ref: 'Course' }])
	course_id: Course
}

export const PaymentSchema = SchemaFactory.createForClass(Payment)
