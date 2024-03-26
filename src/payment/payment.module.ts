import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { ClickModule } from 'src/click/click.module'
import { ClickService } from 'src/click/click.service'
import { Coupon, CouponSchema } from 'src/coupon/coupon.model'
import { Course, CourseSchema } from 'src/course/course.model'
import { PaymentController } from './payment.controller'
import { Payment, PaymentSchema } from './payment.model'
import { PaymentService } from './payment.service'

@Module({
	providers: [PaymentService, ClickService],
	imports: [
		ConfigModule,
		HttpModule,
		ClickModule,
		MongooseModule.forFeature([
			{
				name: Course.name,
				schema: CourseSchema,
			},
			{
				name: Coupon.name,
				schema: CouponSchema,
			},
			{
				name: Payment.name,
				schema: PaymentSchema,
			},
		]),
	],
	controllers: [PaymentController],
})
export class PaymentModule {}
