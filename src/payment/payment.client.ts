import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';

import { catchError, firstValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import ProtheusCheckoutResponseDTO from './dto/protheus-checkout.response.dto';
import ProtheusCheckoutRequestDTO from './dto/protheus-checkout.request.dto';
import axios, { AxiosResponse } from 'axios';
import {
  BAD_GATEWAY_STATUS_CODE,
  GATEWAY_TIMEOUT_STATUS_CODE,
  INTERNAL_SERVER_STATUS_CODE,
  SERVICE_UNAVAILABLE_STATUS_CODE,
} from '@constants/error-codes.constants';
import axiosRetry from 'axios-retry';

axiosRetry(axios, {
  retries: 3,
  retryDelay: (retryCount) => retryCount * 3000,
  retryCondition: (error) =>
    error?.response?.status === INTERNAL_SERVER_STATUS_CODE ||
    error?.response?.status === BAD_GATEWAY_STATUS_CODE ||
    error?.response?.status === SERVICE_UNAVAILABLE_STATUS_CODE ||
    error?.response?.status === GATEWAY_TIMEOUT_STATUS_CODE,
});

@Injectable()
export class PaymentClient {
  private readonly logger = new Logger(PaymentClient.name);
  private readonly httpService: HttpService;

  constructor(httpService: HttpService) {
    this.httpService = httpService;
  }

  async createCheckout(request: ProtheusCheckoutRequestDTO): Promise<ProtheusCheckoutResponseDTO> {
    try {
      this.logger.log('PaymentClient.createCheckout - Start');

      const url = `${process.env.PROTHEUS_URL}/APIMPR/v1/checkout`;

      const response = firstValueFrom(
        this.httpService.post<ProtheusCheckoutResponseDTO>(url, request, { timeout: 60000 }).pipe(
          map((res: AxiosResponse<ProtheusCheckoutResponseDTO>) => res.data),
          catchError((error) => {
            this.logger.error(`PaymentClient.createCheckout - Error checkout [${error}]`);
            throw new InternalServerErrorException();
          }),
        ),
      );

      this.logger.log('PaymentClient.createCheckout - End');

      return response;
    } catch (error) {
      this.logger.error('PaymentClient.createCheckout - Error getting checkout');
      throw error;
    }
  }
}
