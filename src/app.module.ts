import { CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { redisStore } from 'cache-manager-redis-yet'
import { ArticleModule } from './article/article.module'
import { CategoryModule } from './category/category.module'
import { ClickModule } from './click/click.module'
import { getMongoDBConfig } from './config/mongo.config'
import { CouponModule } from './coupon/coupon.module'
import { CourseModule } from './course/course.module'
import { EmployeeModule } from './employee/employee.module'
import { FileModule } from './file/file.module'
import { LessonReviewModule } from './lesson-review/lesson-review.module'
import { LessonModule } from './lesson/lesson.module'
import { PaymentModule } from './payment/payment.module'
import { SectionModule } from './section/section.module'
import { SmsModule } from './sms/sms.module'
import { UserModule } from './user/user.module'

@Module({
	imports: [
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getMongoDBConfig,
		}),
		ConfigModule.forRoot(),
		UserModule,
		CourseModule,
		SectionModule,
		LessonModule,
		EmployeeModule,
		FileModule,
		CategoryModule,
		ArticleModule,
		LessonReviewModule,
		SmsModule,
		ClickModule,
		PaymentModule,
		CouponModule,
		CacheModule.registerAsync({
			isGlobal: true,
			useFactory: async () => ({
				store: await redisStore({
					socket: {
						port: 6379,
						host: 'localhost',
					},
				}),
			}),
		}),
	],
})
export class AppModule {}
