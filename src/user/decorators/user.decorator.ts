import { ExecutionContext, createParamDecorator } from '@nestjs/common'
import { UserDataTypes } from '../user.interface'
import { UserDocument } from '../user.model'

export const User = createParamDecorator((data: UserDataTypes, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest<{ user: UserDocument }>()
  const user = request.user

  return data ? user?.[data] : user
})