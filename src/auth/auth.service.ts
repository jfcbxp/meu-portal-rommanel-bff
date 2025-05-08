import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '../generated/prisma';
import { AuthTokenDTO } from './dto/auth-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  createToken(user: User) {
    return {
      accessToken: this.jwtService.sign({
        sub: user.REC,
        name: user.NOME,
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

  async login(email: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        EMAIL: email,
      },
    });

    if (!user) throw new UnauthorizedException('Usuario não encontrado');

    const check = await bcrypt.compare(password, user.CGC);

    if (!check) throw new UnauthorizedException('Email e/ou senha incorretos');

    return this.createToken(user);
  }
}
