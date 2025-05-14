import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OrderDTO } from './dto/order-dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async find(id: number) {
    return await this.prisma.order.findUnique({
      where: { RECD2: id },
    });
  }

  async findByDocument(userId: number, branch: string, document: string, version: string, page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [content, total] = await Promise.all([
      this.prisma.order.findMany({
        where: { RECA1: userId, DOCUMENTO: document, SERIE: version, EMPRESA: branch },
        skip,
        take: limit,
        orderBy: { ITEM: 'asc' },
      }),
      this.prisma.order.count({
        where: { RECA1: userId, DOCUMENTO: document, SERIE: version, EMPRESA: branch },
      }),
    ]);

    const orders = plainToInstance(OrderDTO, content, { excludeExtraneousValues: true });

    return {
      content: orders,
      totalElements: orders.length,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }
}
