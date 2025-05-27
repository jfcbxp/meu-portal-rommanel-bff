import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '../guards/auth.guard';
import { User } from '../decorators/user.decorator';
import { AuthTokenDTO } from './dto/auth-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: AuthLoginDTO) {
    return this.authService.login(body.id);
  }

  @UseGuards(AuthGuard)
  @Post('me')
  me(@User() user: AuthTokenDTO) {
    return { user };
  }
}
