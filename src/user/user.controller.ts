import { Controller, Get, HttpCode } from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { User } from './decorators/user.decorator'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(200)
  @Get("profile") 
  @Auth()
  async getMyProfile(@User("_id") _id: string) {
    return this.userService.profile(_id)
  }
 
}
