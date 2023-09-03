import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './auth/auth.module'
import { getMongoDBConfig } from './config/mongo.config'
import { UserModule } from './user/user.module';
import { CourseModule } from './course/course.module';
import { SectionModule } from './section/section.module';
import { LessonModule } from './lesson/lesson.module';
import { EmployeeModule } from './employee/employee.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [MongooseModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: getMongoDBConfig
  }) , ConfigModule.forRoot(), AuthModule, UserModule, CourseModule, SectionModule, LessonModule, EmployeeModule, FileModule],
})
export class AppModule {}
