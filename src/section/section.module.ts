import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Course, CourseSchema } from 'src/course/course.model'
import { SectionController } from './section.controller'
import { Section, SectionSchema } from './section.model'
import { SectionService } from './section.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Course.name, schema: CourseSchema},
      {name: Section.name, schema: SectionSchema},
    ])
  ],
  controllers: [SectionController],
  providers: [SectionService],
})
export class SectionModule {}
