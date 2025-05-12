import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../generated/prisma';
import { AuthTokenDTO } from './dto/auth-token.dto';
import { Role } from 'src/enums/role.enum';

@Injectable()
export class AuthService {
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
      throw new BadRequestException(e);
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

  async login(id: string) {
    const user = await this.userService.findByCgc(id);

    if (!user) throw new UnauthorizedException('Usuario não encontrado');

    return this.createToken(user);
  }
}
