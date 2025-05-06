/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ThrottlerGuard } from '@nestjs/throttler';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(ThrottlerGuard)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
