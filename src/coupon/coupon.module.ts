import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CouponController } from './coupon.controller'
import { Coupon, CouponSchema } from './coupon.model'
import { CouponService } from './coupon.service'

@Module({
	controllers: [CouponController],
	providers: [CouponService],
	imports: [
		MongooseModule.forFeature([{ name: Coupon.name, schema: CouponSchema }]),
	],
})
export class CouponModule {}
