import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type UserDocument = HydratedDocument<User>

export type UserRoles = "USER" | "INSTRUCTOR" | "ADMIN" | "CEO"

@Schema()
export class User {
  @Prop({ required: true })
  fullName: string

  @Prop({ required: true, unique: true })
  phone: string

  @Prop({ required: true, minlength: 6 })
  password: string

  @Prop()
  email: string

  @Prop()
  avatar: string

  @Prop()
  address: string

  @Prop()
  role: UserRoles
}


export const UserSchema = SchemaFactory.createForClass(User)