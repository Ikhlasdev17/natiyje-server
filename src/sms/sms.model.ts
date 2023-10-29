import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type SmsDocument = HydratedDocument<Sms>

@Schema({ timestamps: true })
export class Sms {
	@Prop()
	phone: string

	@Prop()
	otp: string

	@Prop()
	expireAt: Date
}

export const SmsSchema = SchemaFactory.createForClass(Sms)
