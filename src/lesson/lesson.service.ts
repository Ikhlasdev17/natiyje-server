import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, isValidObjectId } from 'mongoose'
import { Section, SectionDocument } from 'src/section/section.model'
import { LessonCreateDto } from './dto/lesson-dto'
import { Lesson, LessonDocument } from './lesson.model'

@Injectable()
export class LessonService {
	constructor(
		@InjectModel(Lesson.name)
		private readonly lessonModel: Model<LessonDocument>,
		@InjectModel(Section.name)
		private readonly sectionModel: Model<SectionDocument>
	) {}

	async createLesson(body: LessonCreateDto, sectionId: string) {
		const newLesson = await this.lessonModel.create(body)

		await newLesson.save()

		const updatedSection = await this.sectionModel
			.findByIdAndUpdate(
				sectionId,
				{ $push: { lessons: newLesson._id } },
				{ new: true }
			)
			.populate('lessons')

		if (!updatedSection) throw new BadRequestException('Section not found!')

		return updatedSection
	}

	async updateLesson(
		body: LessonCreateDto,
		lessonId: string,
		sectionId: string
	) {
		await this.lessonModel.findByIdAndUpdate(lessonId, body, {
			new: true,
		})

		const newSection = await this.sectionModel
			.findById(sectionId)
			.populate('lessons')

		return newSection
	}

	async changeLessonPosition(sectionId: string, lessons: string[]) {
		const section = await this.sectionModel.findByIdAndUpdate(
			sectionId,
			{
				$set: { lessons },
			},
			{ new: true }
		)

		return section
	}

	async openLessonSource(lessonId: string) {
		const lesson = await this.lessonModel.findByIdAndUpdate(
			lessonId,
			{
				$set: { isOpen: true },
			},
			{ new: true }
		)

		return lesson
	}

	async closeLessonSource(lessonId: string) {
		const lesson = await this.lessonModel.findByIdAndUpdate(
			lessonId,
			{
				$set: { isOpen: false },
			},
			{ new: true }
		)

		return lesson
	}

	async completeLesson(lessonId: string, userId: string) {
		if (!isValidObjectId(lessonId))
			throw new BadRequestException('Lesson id is invalid!')

		const lesson = await this.lessonModel.findById(lessonId)

		if (!lesson) throw new BadRequestException('Lesson not found!')

		if (!lesson.completed.find(x => x == String(userId))) {
			lesson.completed.push(userId)
		} else {
			lesson.completed = lesson.completed.filter(x => x !== String(userId))
		}

		await lesson.save()

		return lesson
	}
}
