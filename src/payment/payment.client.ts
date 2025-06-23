import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';

import { catchError, delay, firstValueFrom, retry } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class PaymentClient {
  private readonly logger = new Logger(PaymentClient.name);
  private readonly httpService: HttpService;

  constructor(httpService: HttpService) {
    this.httpService = httpService;
  }

  async getCheckout(request: any) {
    try {
      this.logger.log('PaymentClient.getCheckout - Start');

      const url = `${process.env.PROTHEUS_URL}/APIMPR/v1/checkout`;

      const response = await firstValueFrom<unknown>(
        this.httpService.post(url, request, { timeout: Number(process.env.DEFAULT_AXIOS_TIMEOUT) }).pipe(
          retry(3),
          delay(3000),
          catchError((error) => {
            this.logger.error(`PaymentClient.getCheckout - Error getting checkout [${error}]`);
            throw new InternalServerErrorException(error);
          }),
        ),
      );

      this.logger.log('PaymentClient.getCheckout - End');

      return response;
    } catch (error) {
      this.logger.error('PaymentClient.getCheckout - Error getting checkout');

      throw error;
    }
  }
}
