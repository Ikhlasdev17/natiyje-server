import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Section, SectionSchema } from 'src/section/section.model'
import { LessonController } from './lesson.controller'
import { Lesson, LessonSchema } from './lesson.model'
import { LessonService } from './lesson.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Lesson.name, schema: LessonSchema},
      {name: Section.name, schema: SectionSchema},
    ])
  ],
  controllers: [LessonController],
  providers: [LessonService],
})
export class LessonModule {}
