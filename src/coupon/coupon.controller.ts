import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CouponService } from './coupon.service'
import { CreateCouponDto } from './dto/create-coupon-dto'
import { UpdateCouponDto } from './dto/update-coupon-dto'

@Controller('coupon')
export class CouponController {
	constructor(private readonly couponService: CouponService) {}

	@HttpCode(200)
	@Post('/')
	@Auth('ADMIN')
	@UsePipes(new ValidationPipe())
	async createCoupon(@Body() body: CreateCouponDto) {
		return await this.couponService.createCoupon(body)
	}

	@HttpCode(200)
	@Get('/')
	@Auth('ADMIN')
	async getCoupons() {
		return await this.couponService.getCoupons()
	}

	@HttpCode(200)
	@Put('/:couponId')
	@Auth('ADMIN')
	@UsePipes(new ValidationPipe())
	async updateCoupon(
		@Body() body: UpdateCouponDto,
		@Param('couponId') couponId: string
	) {
		return await this.couponService.updateCoupon(couponId, body)
	}

	@HttpCode(200)
	@Delete('/:couponId')
	@Auth('ADMIN')
	@UsePipes(new ValidationPipe())
	async deleteCoupon(@Param('couponId') couponId: string) {
		return await this.couponService.deleteCoupon(couponId)
	}

	@HttpCode(200)
	@Get('/check/:code')
	@Auth()
	@UsePipes(new ValidationPipe())
	async checkCoupon(@Param('code') code: string) {
		return await this.couponService.checkCoupon(code)
	}
}
