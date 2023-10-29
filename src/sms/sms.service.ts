import { HttpService } from '@nestjs/axios'
import {
	BadRequestException,
	ForbiddenException,
	Injectable,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectModel } from '@nestjs/mongoose'
import { AxiosError } from 'axios'
import { compare, genSalt, hash } from 'bcrypt'
import { Model } from 'mongoose'
import { catchError, firstValueFrom } from 'rxjs'
import { getSmsAuthURL, getSmsMessageURL } from 'src/helpers/api.constants'
import { Sms, SmsDocument } from './sms.model'

@Injectable()
export class SmsService {
	constructor(
		private readonly httpService: HttpService,
		private readonly configService: ConfigService,
		@InjectModel(Sms.name) private readonly smsModel: Model<SmsDocument>
	) {}

	async sendSmsOtp(phone: string) {
		if (!phone)
			throw new BadRequestException('Please enter phone for send OTP!')

		const response = await this.loginSmsService()

		const token = response.data.token

		if (!token) throw new ForbiddenException('Error with login sms API!')

		const otp = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000

		const formData = new FormData()

		formData.append('mobile_phone', phone)
		formData.append(
			'message',
			`Natiyje.uz saytimizdan registratsiyadan o'tiw ushin kod: ${otp}`
		)
		formData.append('country_code', `998`)
		formData.append('unicode', '0')

		const responseSendSms = await firstValueFrom(
			this.httpService
				.post(getSmsMessageURL('sms/send'), formData, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.pipe(
					catchError((error: AxiosError) => {
						throw new BadRequestException('Error with connect SMS service!')
					})
				)
		)

		const salt = await genSalt(10)
		const hashedOtp = await hash(String(otp), salt)

		await this.smsModel.create({
			phone: phone,
			otp: hashedOtp,
			expireAt: Date.now() + 120000,
		})

		return responseSendSms.data
	}

	async verifyOtp(otpCode: string, phone: string) {
		if (!otpCode)
			throw new BadRequestException('Please send OTP verification code!')
		if (!phone) throw new BadRequestException('Please send phone number!')

		const isExist = await this.smsModel.find({ phone })

		if (!isExist)
			throw new BadRequestException('Phone number not found from wait list!')

		const currentSession = isExist.slice(-1)[0]

		const compareOtp = await compare(otpCode, currentSession.otp)

		if (!compareOtp) throw new ForbiddenException('Otp code incorrect!')

		if (currentSession.expireAt < new Date())
			throw new BadRequestException('Expire code!')

		await this.smsModel.deleteMany({ phone })

		return 'Success'
	}

	async loginSmsService() {
		const response = await firstValueFrom(
			this.httpService
				.post(getSmsAuthURL('login'), {
					email: this.configService.get('sms_login'),
					password: this.configService.get('sms_password'),
				})
				.pipe(
					catchError((error: AxiosError) => {
						throw 'An error happened!'
					})
				)
		)

		return response.data
	}
}
