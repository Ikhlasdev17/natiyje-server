import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './auth/auth.module'
import { CategoryModule } from './category/category.module'
import { getMongoDBConfig } from './config/mongo.config'
import { CourseModule } from './course/course.module'
import { EmployeeModule } from './employee/employee.module'
import { FileModule } from './file/file.module'
import { LessonModule } from './lesson/lesson.module'
import { SectionModule } from './section/section.module'
import { UserModule } from './user/user.module'
import { ArticleModule } from './article/article.module';
import { LessonReviewModule } from './lesson-review/lesson-review.module';

@Module({
	imports: [
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getMongoDBConfig,
		}),
		ConfigModule.forRoot(),
		AuthModule,
		UserModule,
		CourseModule,
		SectionModule,
		LessonModule,
		EmployeeModule,
		FileModule,
		CategoryModule,
		ArticleModule,
		LessonReviewModule,
	],
})
export class AppModule {}
