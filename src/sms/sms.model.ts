import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type SmsDocument = HydratedDocument<Sms>

@Schema({ timestamps: true })
export class Sms {
	@Prop()
	email: string

	@Prop()
	otp: string

	@Prop()
	expireIn: Date
}

export const SmsSchema = SchemaFactory.createForClass(Sms)
