import { Body, Controller, Get, HttpCode, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { User } from 'src/user/decorators/user.decorator'
import { CourseService } from './course.service'
import { CreateCourseDto } from './dto/create-course-dto'

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post("create")
  @Auth("INSTRUCTOR")
  async createCourse(@Body() body: CreateCourseDto, @User("_id") _id: string) {
    return this.courseService.create(body, _id)
  }
  
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put("update/:courseId")
  @Auth("INSTRUCTOR")
  async updateCourse(@Body() body: CreateCourseDto,  @Param("courseId") courseId: string) {
    return this.courseService.update(body, courseId)
  }

  @HttpCode(200)
  @Get("all")
  async getAllCourses() {
    return this.courseService.getAllCourse()
  }

  @HttpCode(200)
  @Put("activate/:courseId")
  @Auth("INSTRUCTOR")
  async activateCourse(@Param("courseId") courseId: string) {
    return this.courseService.activateCourse(courseId)
  }

  @HttpCode(200)
  @Put("draft/:courseId")
  @Auth("INSTRUCTOR")
  async unActivateCourse(@Param("courseId") courseId: string) {
    return this.courseService.unActivateCourse(courseId)
  }
}
