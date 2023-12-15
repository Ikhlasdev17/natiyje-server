import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { ClickService } from 'src/click/click.service'
import { User } from 'src/user/decorators/user.decorator'
import { PaymentCreateDto, PaymentTypes } from './dto/payment-dto'
import { PaymentService } from './payment.service'

@Controller('payment')
export class PaymentController {
	constructor(
		private readonly paymentService: PaymentService,
		private readonly clickService: ClickService
	) {}

	@HttpCode(200)
	@Auth()
	@Post('/')
	@UsePipes(new ValidationPipe())
	async createInvoice(
		@Body() body: PaymentCreateDto,
		@User('_id') userId: string
	) {
		return await this.paymentService.createInvoice(body, userId)
	}

	@HttpCode(200)
	@Auth()
	@Get('/check/:invoice_id/:payment_type')
	async checkInvoice(
		@Param('invoice_id') invoice_id: string,
		@Param('payment_type') payment_type: PaymentTypes
	) {
		return await this.paymentService.checkInvoice(payment_type, invoice_id)
	}

	@HttpCode(200)
	@Auth()
	@Get('/check-payment/:payment_id/:payment_type')
	async checkPayment(
		@Param('payment_id') payment_id: string,
		@Param('payment_type') payment_type: PaymentTypes
	) {
		return await this.paymentService.checkPayment(payment_type, payment_id)
	}

	@HttpCode(200)
	@Auth()
	@Get('/click-api/prepare')
	async prepareClick() {
		return await this.paymentService.prepareClickPayment()
	}

	@HttpCode(200)
	@Auth()
	@Get('/click-api/complete')
	async completeClick() {
		return await this.paymentService.completeClickPayment()
	}
}
