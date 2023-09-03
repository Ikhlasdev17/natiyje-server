import { Body, Controller, Get, HttpCode, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { SectionCreateDto } from './dto/section-create-dto'
import { SectionService } from './section.service'

@Controller('section')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}


  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post("create/:courseId")
  @Auth("INSTRUCTOR")
  async createSection(
    @Body() body: SectionCreateDto, 
    @Param("courseId") courseId: string
    ) {
    return this.sectionService.createSection(body, courseId)
  }

  
  @HttpCode(200)
  @Get("find/:courseId")
  @Auth()
  async getCourseSections(
    @Param("courseId") courseId: string
    ) {
    return this.sectionService.getCourseSections(courseId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put("update/:sectionId")
  @Auth("INSTRUCTOR")
  async updateSection(@Body() body: SectionCreateDto, 
  @Param("sectionId") sectionId: string,
  ) {
    return this.sectionService.updateSection(body, sectionId)
  }

}
