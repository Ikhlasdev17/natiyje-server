import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User, UserDocument } from './user.model'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ) {}

  async profile(userId: string) {
    const user = await this.userModel.findById(userId)

    if (!user) throw new NotFoundException("User not found!")

    return user
  }
}
