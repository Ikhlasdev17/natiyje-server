import { UseGuards, applyDecorators } from '@nestjs/common'
import { UserRoles } from 'src/user/user.model'
import { OnlyAdminGuard } from '../guards/admin.guard'
import { OnlyCeoGuard } from '../guards/ceo.guard'
import { OnlyInstructorGuard } from '../guards/instructor.guard'
import { JwtAuthGuard } from '../guards/jwt.guard'

export function Auth(role: UserRoles = "USER") {
  return applyDecorators(
    role === "ADMIN" && UseGuards(JwtAuthGuard, OnlyAdminGuard) ||
    role === "INSTRUCTOR" && UseGuards(JwtAuthGuard, OnlyInstructorGuard) ||
    role === "CEO" && UseGuards(JwtAuthGuard, OnlyCeoGuard) ||
    role === "USER" && UseGuards(JwtAuthGuard)
  )
}