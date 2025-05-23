import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaymentDTO } from './dto/payment-dto';
import { plainToInstance } from 'class-transformer';
import PaymentFilterResponseDTO from './dto/payment-filter.response.dto';
import { FilterDaysEnum } from 'src/enums/filter-days.enum';
import { FilterTypesEnum } from 'src/enums/filter-types.enum';
import { PaymentListParamsDto } from './dto/payment-list-params.dto';

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

  async findAll(id: number, page: number, limit: number, params: PaymentListParamsDto) {
    const skip = (page - 1) * limit;

    // Use tipagem leve para views
    const where: { [key: string]: unknown } = { RECA1: id };

    if (params.startDate) {
      where.EMISSAO = { ...(where.EMISSAO ?? {}), gte: new Date(params.startDate) };
    }
    if (params.endDate) {
      const end = new Date(params.endDate + 'T23:59:59.999');
      where.EMISSAO = { ...(where.EMISSAO ?? {}), lte: end };
    }
    if (params.type) {
      where.TIPO = params.type;
    }
    if (params.status) {
      where.STATUS = params.status;
    }

    const [content, total] = await Promise.all([
      this.prisma.payment.findMany({
        where,
        skip,
        take: limit,
        orderBy: { EMISSAO: 'desc' },
      }),
      this.prisma.payment.count({
        where,
      }),
    ]);

    const payments = plainToInstance(PaymentDTO, content, { excludeExtraneousValues: true });

    return {
      days: this.getDays(),
      types: this.getTypes(),
      content: payments,
      totalElements: payments.length,
      page: page,
      totalPages: Math.ceil(total / limit),
    };
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
