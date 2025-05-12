import { Body, Controller, Post, UseGuards, Logger } from '@nestjs/common';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '../guards/auth.guard';
import { User } from '../decorators/user.decorator';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: AuthLoginDTO) {
    this.logger.log(`Tentando autenticar o cgc: ${body.id}`);

    return this.authService.login(body.id);
  }

  @UseGuards(AuthGuard)
  @Post('me')
  me(@User() user: unknown) {
    return { user };
  }
}
