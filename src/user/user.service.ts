import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: number) {
    return await this.prisma.user.findUnique({
      where: {
        REC: id,
      },
    });
  }

  async findByCgcAndPassword(id: string, password: string) {
    return await this.prisma.user.findFirst({
      where: {
        CGC: id,
        SENHA: password,
      },
    });
  }
}
