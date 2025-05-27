import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaymentDTO } from './dto/payment-dto';
import { plainToInstance } from 'class-transformer';
import PaymentFilterResponseDTO from './dto/payment-filter.response.dto';
import { FilterDaysEnum } from 'src/enums/filter-days.enum';
import { FilterTypesEnum } from 'src/enums/filter-types.enum';
import { PaymentListParamsDto } from './dto/payment-list-params.dto';
import { FilterStatusEnum } from 'src/enums/filter-status.enum';
import PaymentGroupResponseDTO from './dto/payment-group-response.dto';
import { AppConstants } from '@constants/app.constants';

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);

  constructor(private readonly prisma: PrismaService) {}

  async find(id: number) {
    this.logger.log(`PaymentService.find - Start: ${id}`);

    return await this.prisma.payment.findUnique({
      where: {
        RECE1: id,
      },
    });
  }

  async findAll(id: number, page: number, limit: number, params: PaymentListParamsDto) {
    this.logger.log(`PaymentService.findAll - Start: ${id}`);

    const skip = (page - 1) * limit;

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
      const status = FilterStatusEnum[params.status] as string;
      where.SITUACAO = status;
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

    this.logger.log(`PaymentService.findAll - End: ${id}`);

    return {
      days: this.getDays(),
      types: this.getTypes(),
      status: this.getStatus(),
      content: this.getGroupedPayments(payments),
      elements: payments.length,
      totalElements: total,
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

  private getStatus(): PaymentFilterResponseDTO[] {
    return Object.values(FilterStatusEnum).map((value) => ({
      code: this.getEnumKeyByEnumValue(FilterStatusEnum, value),
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

  private getGroupedPayments(payments: PaymentDTO[]): PaymentGroupResponseDTO[] {
    const days = payments.map((payment) => ({
      code: payment.invoiceWorkingDate.split('T')[0],
      order: this.optimizePaymentResponse(payment),
    }));

    const result = days.reduce(
      (accumulator, current) =>
        accumulator.set(current.code, [...new Set([...(accumulator.get(current.code) || []), current.order])]),
      new Map<string, PaymentDTO[]>(),
    );

    const response: PaymentGroupResponseDTO[] = [...result].map((item) => {
      return {
        groupId: item[0],
        description: this.getGroupDescription(item[0]),
        orders: item[1],
      };
    });

    return response;
  }

  private optimizePaymentResponse(order: PaymentDTO) {
    order.image = `${process.env.PRODUCT_IMAGE_BASE_URL}/${order.product}`;

    return order;
  }

  private getGroupDescription(groupId: string) {
    // Espera groupId no formato "dd/MM/yyyy"
    const [day, month, year] = groupId.split('/').map(Number);
    const baseDate = new Date(year, month - 1, day); // mês começa em 0

    const dayStr = baseDate.getDate().toString().padStart(2, '0');
    const monthStr = baseDate
      .toLocaleString(AppConstants.LOCALE_STRING_BR, { month: 'long' })
      .replace(/^./, (str) => str.toUpperCase());
    const yearStr = baseDate.getFullYear();

    return `${dayStr} ${monthStr} ${yearStr}`;
  }
}
