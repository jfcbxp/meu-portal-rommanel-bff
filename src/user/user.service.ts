import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async list() {
    return await this.prisma.user.findMany({
      where: {
        EMAIL: {
          contains: '@',
        },
      },
    });
  }

  async show(id: number) {
    return await this.prisma.user.findUnique({
      where: {
        REC: id,
      },
    });
  }
}
