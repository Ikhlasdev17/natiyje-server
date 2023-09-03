import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User, UserDocument } from 'src/user/user.model'
import { Course, CourseDocument } from './course.model'
import { CreateCourseDto } from './dto/create-course-dto'

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name) private readonly courseModel: Model<CourseDocument> ,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument> ,
    
    ) {}

  async create(body: CreateCourseDto, _id: string) {

    const author = await this.userModel.findById(_id)
 
 
    const newCourse = await this.courseModel.create({...body, author: author._id})

    await newCourse.save()

    return newCourse
  }

  async update(body: CreateCourseDto, courseId: string) {
    const newCourse = await this.courseModel.findByIdAndUpdate(courseId, body, {new: true})

    return newCourse
  }

  async getAllCourse() {
    const courses = await this.courseModel.find()
      .populate("author", "fullName _id avatar")

    return courses
  }

  async activateCourse(courseId: string) {
    const course = this.courseModel.findByIdAndUpdate(courseId, {
      $set: { isActive: true }
    }, {new: true}).exec()

    return course
  }

  async unActivateCourse(courseId: string) {
    const course = this.courseModel.findByIdAndUpdate(courseId, {
      $set: { isActive: false }
    }, {new: true}).exec()

    return course
  }
}
