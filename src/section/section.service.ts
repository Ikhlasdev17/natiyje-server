import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Course, CourseDocument } from 'src/course/course.model'
import { SectionCreateDto } from './dto/section-create-dto'
import { Section, SectionDocument } from './section.model'

@Injectable()
export class SectionService {
	constructor(
		@InjectModel(Section.name)
		private readonly sectionModel: Model<SectionDocument>,
		@InjectModel(Course.name)
		private readonly courseModel: Model<CourseDocument>
	) {}

	async createSection(body: SectionCreateDto, courseId: string) {
		const newSection = await this.sectionModel.create(body)

		const updateCourse = await this.courseModel
			.findByIdAndUpdate(
				courseId,
				{
					$push: { sections: newSection._id },
				},
				{
					new: true,
				}
			)
			.populate('sections')

		return updateCourse
	}

	async getCourseSections(courseId: string) {
		try {
			const course = await this.courseModel.findById(courseId).populate({
				path: 'sections',
				populate: { path: 'lessons' },
			})

			if (!course) throw new BadRequestException('Course not found!')

			return course.sections
		} catch (error) {
			throw new BadRequestException('Course not found!')
		}
	}

	async updateSection(body: SectionCreateDto, sectionId: string) {
		if (sectionId.length !== '64f36598678e2bb984226224'.length)
			throw new BadRequestException('Invalid section id!')

		const courseIsExist = await this.sectionModel.findById(sectionId)

		if (!courseIsExist) throw new BadRequestException('Section not found!')

		const updateSection = await this.sectionModel.findByIdAndUpdate(
			sectionId,
			body,
			{
				new: true,
			}
		)

		return updateSection
	}

	async deleteSection(sectionId: string, courseId: string) {
		await this.courseModel.findByIdAndUpdate(courseId, {
			$pull: { sections: sectionId },
		})

		const section = await this.sectionModel.findByIdAndRemove(sectionId)

		return section
	}

	async changePosition(courseId: string, sections: string[]) {
		const course = await this.courseModel.findByIdAndUpdate(
			courseId,
			{
				$set: { sections: sections },
			},
			{ new: true }
		)

		return course
	}
}
