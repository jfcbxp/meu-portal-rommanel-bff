import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { RoleGuard } from 'src/guards/role.guard';

import { OrderService } from './order.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from 'src/decorators/user.decorator';
import { AuthTokenDTO } from 'src/auth/dto/auth-token.dto';

@UseGuards(AuthGuard, RoleGuard)
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(AuthGuard)
  @Get()
  paymentHistory(
    @User() user: AuthTokenDTO,
    @Query('branch') branch: string,
    @Query('document') document: string,
    @Query('version') version: string,
  ) {
    return this.orderService.findByDocument(user.sub, branch, document, version);
  }
}
