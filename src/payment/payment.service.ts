import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaymentDTO } from './dto/payment-dto';
import { plainToInstance } from 'class-transformer';
import PaymentFilterResponseDTO from './dto/payment-filter.response.dto';
import { FilterDaysEnum } from 'src/enums/filter-days.enum';
import { FilterTypesEnum } from 'src/enums/filter-types.enum';

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
      days: this.getDays(),
      types: this.getTypes(),
      content: payments.map((payment) => this.optimizePaymentResponse(payment)),
      totalElements: payments.length,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  private optimizePaymentResponse(payment: PaymentDTO) {
    payment.status = payment.balance > 0 ? 'Pendente' : 'Pago';

    return payment;
  }

  private getDays(): PaymentFilterResponseDTO[] {
    return Object.values(FilterDaysEnum).map((value) => ({
      code: value,
      description: this.getDayDescription(value),
    }));
  }

  private getTypes(): PaymentFilterResponseDTO[] {
    return Object.values(FilterTypesEnum).map((value) => ({
      code: this.getEnumKeyByEnumValue(FilterTypesEnum, value),
      description: value,
    }));
  }

  private getDayDescription(day: FilterDaysEnum): string {
    return day === FilterDaysEnum.YEAR ? `1 Ano` : `${day} Dias`;
  }

  private getEnumKeyByEnumValue(myEnum: Record<string, string | number>, enumValue: number | string): string {
    const keys = Object.keys(myEnum).filter((x) => myEnum[x] == enumValue);
    return keys.length > 0 ? keys[0] : '';
  }
}
