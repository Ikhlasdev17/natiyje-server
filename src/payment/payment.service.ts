import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, isObjectIdOrHexString } from 'mongoose'
import { ClickService } from 'src/click/click.service'
import { Coupon, CouponDocument } from 'src/coupon/coupon.model'
import { Course, CourseDocument } from 'src/course/course.model'
import { PaymentCreateDto, PaymentTypes } from './dto/payment-dto'

@Injectable()
export class PaymentService {
	constructor(
		private readonly clickService: ClickService,
		@InjectModel(Course.name)
		private readonly courseModel: Model<CourseDocument>,
		@InjectModel(Coupon.name)
		private readonly couponModel: Model<CouponDocument>
	) {}

	async createInvoice(body: PaymentCreateDto, userId: string) {
		if (!isObjectIdOrHexString(body.course_id))
			throw new BadRequestException('Course id is invalid!')

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
			const response = await this.clickService.createInvoice(amount, body.phone)

			return {
				invoice_id: response.invoice_id,
				error_code: response.error_code,
				message: response.error_note,
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

	async prepareClickPayment() {}
	async completeClickPayment() {}
}
