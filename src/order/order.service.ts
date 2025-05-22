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

  async findByDocument(userId: number, branch: string, document: string, version: string) {
    const content = await this.prisma.order.findMany({
      where: { RECA1: userId, DOCUMENTO: document, SERIE: version, EMPRESA: branch },
      orderBy: { ITEM: 'asc' },
    });

    const orders = plainToInstance(OrderDTO, content, { excludeExtraneousValues: true });

    return {
      content: orders.map((order) => this.optimizeOrderResponse(order)),
      totalElements: orders.length,
    };
  }

  private optimizeOrderResponse(order: OrderDTO) {
    order.image = `${process.env.PRODUCT_IMAGE_BASE_URL}/${order.product}`;

    return order;
  }
}
