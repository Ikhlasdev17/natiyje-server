import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { path } from 'app-root-path'
import { ensureDir, writeFile } from "fs-extra"
import { Model } from 'mongoose'
import { v4 as uuid } from "uuid"
import { FileResponse } from './file.interface'
import { File, FileDocument } from './file.model'

@Injectable()
export class FileService {
  constructor(
    @InjectModel(File.name) private readonly fileModel: Model<FileDocument>
  ) {}

  async upload(file: Express.Multer.File, folder: string = "default"): Promise<FileDocument> {
    const id = uuid()
    const uploadFolder = `${path}/uploads/${folder}`
    await ensureDir(uploadFolder)
    await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer) 

    const res: FileResponse = {
      name: `${file.originalname}`,
      url: `/uploads/${folder}/${file.originalname}`
    }

    const newFile = await this.fileModel.create({
      name: res.name,
      path: res.url
    })

    await newFile.save()
    
    return newFile
  }

  async getAllFiles() {
    const files = await this.fileModel.find()

    return files
  }
}
