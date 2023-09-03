import { IsNumber, IsString } from 'class-validator'

export class LessonCreateDto {
  @IsString()
  name: string

  material: string

  @IsString()
  embedVideo: string
  
  @IsNumber()
  hour: number
  
  @IsNumber()
  minute: number
  
  @IsNumber()
  second: number
}