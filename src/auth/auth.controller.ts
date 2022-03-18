import { Controller, Post, HttpStatus, Request, HttpException } from '@nestjs/common'
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Request() req) {
    const result = await this.authService.login(req.body)
    if (!result) {
      throw new HttpException('Ошибка логина или пароля', HttpStatus.FORBIDDEN)
    }

    return result
  }
}
