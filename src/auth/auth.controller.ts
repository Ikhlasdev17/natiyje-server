import {
	Body,
	Controller,
	HttpCode,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { CheckUser } from './dto/check-user-dto'
import { LoginDto } from './dto/login-dto'
import { RegisterDto } from './dto/register-dto'
import { TokenDto } from './dto/token-dto'
import { UpdatePasswordDto } from './dto/update-password-dto'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register')
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	async register(@Body() body: RegisterDto) {
		return this.authService.register(body)
	}

	@Post('login')
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	async login(@Body() body: LoginDto) {
		return this.authService.login(body)
	}

	@Post('access')
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	async getNewTokens(@Body() body: TokenDto) {
		return this.authService.getNewTokens(body)
	}

	@Post('exist-user')
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	async checkExistUser(@Body() body: CheckUser) {
		return this.authService.checkExistUser(body.phone)
	}

	@Post('update-password')
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	async updatePassword(@Body() body: UpdatePasswordDto) {
		return this.authService.updateUserPassword(body.phone, body.password)
	}
}
