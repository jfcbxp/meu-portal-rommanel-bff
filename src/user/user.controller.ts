import { Controller, UseGuards } from '@nestjs/common';
import { RoleGuard } from 'src/guards/role.guard';

import { UserService } from './user.service';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard, RoleGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
}
