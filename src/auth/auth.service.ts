import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/mongoose'
import * as bcrypt from "bcrypt"
import { Model } from 'mongoose'
import { User, UserDocument } from 'src/user/user.model'
import { LoginDto } from './dto/login-dto'
import { RegisterDto } from './dto/register-dto'
import { TokenDto } from './dto/token-dto'
@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  private readonly jwtService: JwtService) {}


  async register(body: RegisterDto) {
    const isExistUser = await this.isExistUser(body.phone)
    if (isExistUser) {
      throw new BadRequestException("User with that phone number is already exist!")
    }

    const hashedPass = await this.getHashedPass(body.password)

    const newUser = await this.userModel.create({ ...body, password: hashedPass })
    await newUser.save()
    return newUser
  }

  async login(body: LoginDto) {
    const isExistUser = await this.isExistUser(body.phone)

    if (!isExistUser) throw new BadRequestException("User not found!")

    const compirePass = await bcrypt.compare(body.password, isExistUser.password)

    if (!compirePass) throw new BadRequestException("Password incorrect!")

    const token = await this.issueTokenPair(isExistUser._id.toString())

    return { user: this.getSpecificUserData(isExistUser), ...token}
  }

  async getNewTokens({ refreshToken }: TokenDto) {
    if (!refreshToken) throw new UnauthorizedException("Unauthenticated!")

    const result = await this.jwtService.verifyAsync(refreshToken)

    if (!result) throw new UnauthorizedException("Invalid token, or expired!")

    const user = await this.userModel.findById(result._id)

    const token = await this.issueTokenPair(user._id?.toString())

    return {user, ...token}
  }

  async isExistUser(phone: string) {
    const user = await this.userModel.findOne({ phone })  
    return user
  }

  async getHashedPass(pass: string) {
    const salt = await bcrypt.genSalt(10)
    const hashesPass = await bcrypt.hash(pass, salt)
    return hashesPass
  }

  async issueTokenPair(userId: string) {
    const data = { _id: userId }

    const refreshToken = await this.jwtService.signAsync(data, { expiresIn: '15d' })

    const accessToken = await this.jwtService.signAsync(data, { expiresIn: '3d' })

    return {
      refreshToken,
      accessToken
    }
  }

  getSpecificUserData(user: UserDocument) {
    return {
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      _id: user._id
    }
  }
}
