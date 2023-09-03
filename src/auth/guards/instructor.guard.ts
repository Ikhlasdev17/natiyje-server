import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { UserDocument } from 'src/user/user.model'

@Injectable()
export class OnlyInstructorGuard implements CanActivate {
  constructor ( readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{ user: UserDocument }>()
    const user = request.user

    if (user.role === "INSTRUCTOR" || user.role === "ADMIN" || user.role === "CEO") {
      return true
    } else {
      throw new ForbiddenException()
    }
  }
}