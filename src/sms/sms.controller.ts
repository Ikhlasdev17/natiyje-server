import { Body, Controller, Post } from '@nestjs/common'
import { SmsService } from './sms.service'

@Controller('sms')
export class SmsController {
	constructor(private readonly smsService: SmsService) {}

	@Post('send-otp')
	async sendOtp(@Body() body: { phone: string }) {
		return this.smsService.sendSmsOtp(body.phone)
	}

	@Post('verify-otp')
	async verifyOtp(@Body() body: { phone: string; otpCode: string }) {
		return this.smsService.verifyOtp(body.otpCode, body.phone)
	}
}
