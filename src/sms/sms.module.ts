import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
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
		]),
	],
	controllers: [SmsController],
	providers: [SmsService],
})
export class SmsModule {}
