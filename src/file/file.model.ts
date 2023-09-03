import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from "mongoose"

export type FileDocument = HydratedDocument<File>

@Schema({ timestamps: true })
export class File {
  @Prop()
  path: string

  @Prop()
  name: string
}

export const FileSchema = SchemaFactory.createForClass(File)