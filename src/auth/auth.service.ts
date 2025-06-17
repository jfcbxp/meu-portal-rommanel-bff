import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../generated/prisma';
import { AuthTokenDTO } from './dto/auth-token.dto';
import { Role } from 'src/enums/role.enum';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  createToken(user: User) {
    return {
      accessToken: this.jwtService.sign({
        sub: user.REC,
        name: user.NOME,
        cgc: user.CGC,
        role: Role.User,
      }),
    };
  }

  checkToken(token: string) {
    try {
      const response = this.jwtService.verify<AuthTokenDTO>(token, {
        audience: 'users',
        issuer: 'login',
      });

      return response;
    } catch (e) {
      throw new UnauthorizedException(e);
    }
  }

  isValidToken(token: string) {
    try {
      this.checkToken(token);

      return true;
    } catch {
      return false;
    }
  }

  async login(id: string, password: string) {
    const user = await this.userService.findByCgcAndPassword(id, password);

    this.logger.log(`AuthService.login - Start: ${id}`);

    if (!user) throw new UnauthorizedException('Usuario não encontrado');

    return this.createToken(user);
  }
}
