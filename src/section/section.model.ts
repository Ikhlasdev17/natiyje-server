import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Schema as SchemaMS } from 'mongoose'
import { Course } from 'src/course/course.model'
import { Lesson } from 'src/lesson/lesson.model'


export type SectionDocument = HydratedDocument<Section>

@Schema({ timestamps: true })
export class Section {
  @Prop()
  title: string

  @Prop([{ type: SchemaMS.Types.ObjectId, ref: "Lesson" }])
  lessons: Lesson[]

  @Prop({ type: SchemaMS.Types.ObjectId, ref: "Course" })
  course: Course
}

export const SectionSchema = SchemaFactory.createForClass(Section)