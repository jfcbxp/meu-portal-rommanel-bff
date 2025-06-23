import { Controller, Get, UseGuards, Query, Post, Body } from '@nestjs/common';

import { PaymentService } from './payment.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from 'src/decorators/user.decorator';
import { AuthTokenDTO } from 'src/auth/dto/auth-token.dto';
import { PaymentListParamsDto } from './dto/payment-list-params.dto';
import { AppConstants } from '@constants/app.constants';
import PaymentCheckoutRequestDTO from './dto/payment-checkout.request.dto';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(AuthGuard)
  @Get()
  paymentHistory(
    @User() user: AuthTokenDTO,
    @Query() params: PaymentListParamsDto,
    @Query('page') page: number = AppConstants.PAGE_DEFAULT,
    @Query('limit') limit: number = AppConstants.LIMIT_DEFAULT,
  ) {
    return this.paymentService.findAll(user.sub, page, limit, params);
  }

  @UseGuards(AuthGuard)
  @Post()
  createCheckout(@User() user: AuthTokenDTO, @Body() body: PaymentCheckoutRequestDTO) {
    return this.paymentService.createCheckout(user.sub, body);
  }
}
