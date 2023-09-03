import { IsNotEmpty, IsString } from 'class-validator'

export class SectionCreateDto {
  @IsString()
  @IsNotEmpty()
  title: string

  course: string
  lessons: string[]
}