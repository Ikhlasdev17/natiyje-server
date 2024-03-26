import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { createHash } from 'crypto'
import { firstValueFrom } from 'rxjs'
import { getClickBaseUrl } from 'src/helpers/api.constants'
import {
	ClickCheckInvoiceResponseType,
	ClickCreateInvoiceResponseType,
} from './types/click.types'

@Injectable()
export class ClickService {
	constructor(
		private readonly httpService: HttpService,
		private readonly configService: ConfigService
	) {}

	async createInvoice(
		amount: number,
		phone_number: string,
		merchant_trans_id: string
	) {
		const service_id = this.configService.getOrThrow('click_service_id')

		const response = await firstValueFrom(
			this.httpService.post<ClickCreateInvoiceResponseType>(
				getClickBaseUrl(`merchant/invoice/create`),
				{
					merchant_trans_id: merchant_trans_id,
					service_id: service_id,
					amount: amount,
					phone_number: phone_number,
				},
				{
					headers: {
						Auth: await this.getClickHeaders(),
						'Content-type': 'Application/json',
						Accept: 'application/json',
					},
				}
			)
		)

		return response.data
	}

	async checkInvoice(invoice_id: string) {
		const service_id = this.configService.getOrThrow('click_service_id')

		const response = await firstValueFrom(
			this.httpService.get<ClickCheckInvoiceResponseType>(
				getClickBaseUrl(`merchant/invoice/status/${service_id}/${invoice_id}`),
				{
					headers: {
						Auth: await this.getClickHeaders(),
						'Content-type': 'Application/json',
						Accept: 'application/json',
					},
				}
			)
		)

		return response.data
	}

	async checkPayment(payment_id: string) {
		const service_id = this.configService.getOrThrow('click_service_id')

		const response = await firstValueFrom(
			this.httpService.get<ClickCheckInvoiceResponseType>(
				getClickBaseUrl(`merchant/payment/status/${service_id}/${service_id}`),
				{
					headers: {
						Auth: await this.getClickHeaders(),
						'Content-type': 'Application/json',
						Accept: 'application/json',
					},
				}
			)
		)

		return response.data
	}

	async getClickHeaders() {
		const secret_key = this.configService.getOrThrow('click_secret_key')
		const merchant_user_id = this.configService.getOrThrow(
			'click_merchant_user_id'
		)

		function unixTimestamp() {
			return Math.floor(Date.now() / 1000)
		}

		const digest = createHash('sha1')
			.update(unixTimestamp() + secret_key)
			.digest('hex')

		return `${merchant_user_id}:${digest}:${unixTimestamp()}`
	}
}
