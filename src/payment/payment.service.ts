import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, isObjectIdOrHexString } from 'mongoose'
import { ClickService } from 'src/click/click.service'
import { Coupon, CouponDocument } from 'src/coupon/coupon.model'
import { Course, CourseDocument } from 'src/course/course.model'
import {
	PaymentCreateDto,
	PaymentTypes,
	PreparePaymentDto,
} from './dto/payment-dto'
import { Payment, PaymentDocument, PaymentStatuses } from './payment.model'

@Injectable()
export class PaymentService {
	constructor(
		private readonly clickService: ClickService,
		@InjectModel(Course.name)
		private readonly courseModel: Model<CourseDocument>,
		@InjectModel(Coupon.name)
		private readonly couponModel: Model<CouponDocument>,
		@InjectModel(Payment.name)
		private readonly paymentModel: Model<PaymentDocument>
	) {}

	async createInvoice(body: PaymentCreateDto, userId: string) {
		if (!isObjectIdOrHexString(body.course_id))
			throw new BadRequestException('Course id is invalid!')

		const merchant_trans_id = Date.now()

		const course = await this.courseModel.findById(body.course_id)

		if (!course) throw new BadRequestException('Course not found!')

		let amount = course.price

		if (body.coupon) {
			const coupon = await this.couponModel.findById(body.coupon)
			if (!coupon) throw new BadRequestException('Coupon not found!')

			if (!coupon.used_users.find(x => x !== String(userId))) {
				amount -= coupon.amount
				await this.couponModel.findByIdAndUpdate(coupon._id, {
					$push: {
						used_users: userId,
					},
				})
			}
		}

		if (body.payment_type === 'CLICK') {
			const response = await this.clickService.createInvoice(
				amount,
				body.phone,
				merchant_trans_id.toString()
			)

			const newPayment = await this.paymentModel.create({
				amount: amount,
				payment_type: 'CLICK',
				merchant_trans_id: merchant_trans_id,
				course_id: course,
			})

			return {
				invoice_id: response.invoice_id,
				error_code: response.error_code,
				message: response.error_note,
				payment: newPayment,
			}
		}
	}

	async checkInvoice(payment_type: PaymentTypes, invoice_id: string) {
		if (payment_type === 'CLICK') {
			const response = await this.clickService.checkInvoice(invoice_id)
			return response
		} else {
			return {
				message: 'Current payment type is not registered!',
			}
		}
	}

	async checkPayment(payment_type: PaymentTypes, invoice_id: string) {
		if (payment_type === 'CLICK') {
			const response = await this.clickService.checkPayment(invoice_id)
			return response
		} else {
			return {
				message: 'Current payment type is not registered!',
			}
		}
	}

	async prepareClickPayment(body: PreparePaymentDto) {
		const payment = await this.paymentModel.findOne({
			merchant_trans_id: body.merchant_trans_id,
		})

		let merchant_confirm_id = '0'
		let merchant_prepare_id = '0'

		if (payment) {
			merchant_confirm_id = String(payment._id)
			merchant_prepare_id = String(payment._id)
		}

		const result = {
			click_trans_id: body.click_trans_id,
			merchant_trans_id: body.merchant_trans_id,
			merchant_confirm_id: merchant_confirm_id,
			merchant_prepare_id: merchant_prepare_id,
		}

		if (body.error == 0) {
			await this.paymentModel.updateOne(
				{ _id: payment._id },
				{
					$set: {
						status: PaymentStatuses.WAITING,
					},
				},
				{ new: true }
			)
		}

		return result
	}
	async completeClickPayment() {
		console.log('COMPLETED')

		return {
			message: 'test',
		}
	}
}
