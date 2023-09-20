import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Course, CourseSchema } from 'src/course/course.model'
import { UserController } from './user.controller'
import { User, UserSchema } from './user.model'
import { UserService } from './user.service'

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: User.name, schema: UserSchema },
			{ name: Course.name, schema: CourseSchema },
		]),
	],
	controllers: [UserController],
	providers: [UserService],
})
export class UserModule {}
