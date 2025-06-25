import { MiddlewareConsumer, Module, NestModule, RequestMethod, forwardRef } from '@nestjs/common';
import { UserIdCheckMiddleware } from '../middlewares/user-id-check.middleware';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { HttpModule } from '@nestjs/axios';
import { PaymentClient } from './payment.client';

@Module({
  imports: [PrismaModule, forwardRef(() => AuthModule), HttpModule],
  controllers: [PaymentController],
  providers: [PaymentService, PaymentClient],
  exports: [PaymentService, PaymentClient],
})
export class PaymentModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserIdCheckMiddleware).forRoutes({
      path: 'payments/:id',
      method: RequestMethod.ALL,
    });
  }
}
