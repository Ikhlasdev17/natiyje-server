import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Schema as SchemaMS } from 'mongoose'

export type CouponDocument = HydratedDocument<Coupon>

@Schema({ timestamps: true })
export class Coupon {
	@Prop()
	code: string

	@Prop()
	expiresIn: Date

	@Prop()
	amount: number

	@Prop([{ type: SchemaMS.Types.ObjectId, ref: 'User' }])
	used_users: string[]
}

export const CouponSchema = SchemaFactory.createForClass(Coupon)
