import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HealthCheck } from '@nestjs/terminus';

@Controller('/actuator/health')
export default class HealthController {
  private readonly healthCheckService: HealthCheckService;

  constructor(healthCheckService: HealthCheckService) {
    this.healthCheckService = healthCheckService;
  }

  @Get()
  @HealthCheck()
  check() {
    return this.healthCheckService.check([]);
  }
}
