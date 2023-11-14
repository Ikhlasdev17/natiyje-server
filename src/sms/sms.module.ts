import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from 'src/user/user.model'
import { SmsController } from './sms.controller'
import { Sms, SmsSchema } from './sms.model'
import { SmsService } from './sms.service'

@Module({
	imports: [
		HttpModule,
		ConfigModule,
		MongooseModule.forFeature([
			{
				name: Sms.name,
				schema: SmsSchema,
			},
			{
				name: User.name,
				schema: UserSchema,
			},
		]),
	],
	controllers: [SmsController],
	providers: [SmsService],
})
export class SmsModule {}
