import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaymentDTO } from './dto/payment-dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class PaymentService {
  constructor(private readonly prisma: PrismaService) {}

  async find(id: number) {
    return await this.prisma.payment.findUnique({
      where: {
        RECE1: id,
      },
    });
  }

  async findAll(id: number, page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [content, total] = await Promise.all([
      this.prisma.payment.findMany({
        where: { RECA1: id },
        skip,
        take: limit,
        orderBy: { EMISSAO: 'desc' },
      }),
      this.prisma.payment.count({
        where: { RECA1: id },
      }),
    ]);

    const payments = plainToInstance(PaymentDTO, content, { excludeExtraneousValues: true });

    return {
      content: payments,
      totalElements: payments.length,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }
}
