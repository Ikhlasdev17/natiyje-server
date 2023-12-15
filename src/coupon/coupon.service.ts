import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Coupon, CouponDocument } from './coupon.model'
import { CreateCouponDto } from './dto/create-coupon-dto'
import { UpdateCouponDto } from './dto/update-coupon-dto'

@Injectable()
export class CouponService {
	constructor(
		@InjectModel(Coupon.name)
		private readonly couponModel: Model<CouponDocument>
	) {}

	async createCoupon(body: CreateCouponDto) {
		const newCoupon = await this.couponModel.create(body)

		return newCoupon
	}

	async getCoupons() {
		const coupons = await this.couponModel.find()

		return coupons
	}
	async updateCoupon(couponId: string, body: UpdateCouponDto) {
		const coupon = await this.couponModel.findByIdAndUpdate(
			couponId,
			{
				$set: {
					...body,
				},
			},
			{
				new: true,
			}
		)

		await coupon.save()

		return coupon
	}

	async deleteCoupon(couponId: string) {
		const coupon = await this.couponModel.deleteOne({
			_id: couponId,
		})

		return coupon
	}

	async checkCoupon(code: string) {
		const coupon = await this.couponModel.findOne({
			code,
		})

		if (!coupon) throw new BadRequestException('Coupon not found!')

		return {
			amount: coupon.amount,
			code: coupon.code,
			expiresIn: coupon.expiresIn,
			_id: coupon._id,
		}
	}
}
