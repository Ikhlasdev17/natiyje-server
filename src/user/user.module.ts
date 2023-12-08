import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from 'src/auth/auth.module'
import { Course, CourseSchema } from 'src/course/course.model'
import { Sms, SmsSchema } from 'src/sms/sms.model'
import { SmsModule } from 'src/sms/sms.module'
import { SmsService } from 'src/sms/sms.service'
import { UserController } from './user.controller'
import { User, UserSchema } from './user.model'
import { UserService } from './user.service'

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: User.name, schema: UserSchema },
			{ name: Course.name, schema: CourseSchema },
			{ name: Sms.name, schema: SmsSchema },
		]),
		AuthModule,
		SmsModule,
		ConfigModule,
		HttpModule,
	],
	controllers: [UserController],
	providers: [UserService, SmsService],
})
export class UserModule {}
