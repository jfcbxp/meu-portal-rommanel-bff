import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { RoleGuard } from 'src/guards/role.guard';

import { PaymentService } from './payment.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from 'src/decorators/user.decorator';
import { AuthTokenDTO } from 'src/auth/dto/auth-token.dto';

@UseGuards(AuthGuard, RoleGuard)
@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(AuthGuard)
  @Get()
  paymentHistory(@User() user: AuthTokenDTO, @Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.paymentService.findAll(user.sub, Number(page), Number(limit));
  }
}
