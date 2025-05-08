import { Controller, Get, UseGuards } from '@nestjs/common';
import { RoleGuard } from 'src/guards/role.guard';
import { ParamId } from '../decorators/param-id.decorator';

import { UserService } from './user.service';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard, RoleGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async read() {
    return this.userService.list();
  }

  @Get(':id')
  async readOne(@ParamId() id: number) {
    return this.userService.show(id);
  }
}
