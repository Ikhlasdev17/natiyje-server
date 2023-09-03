import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

export class RegisterDto {
  @IsString({ message: "fullName should be string!" })
  @IsNotEmpty()
  fullName: string

  @IsString()
  @MinLength(6)
  @MaxLength(24)
  password: string

  @IsString()
  @IsNotEmpty()
  phone: string

  email: string
  address: string
}