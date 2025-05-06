import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from 'src/decorators/roles.decorator';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [context.getHandler(), context.getClass()]);

    if (!requiredRoles) true;

    const { user } = context.switchToHttp().getRequest();

    const rolesFiltered = requiredRoles.filter((role: number) => role === user.role);

    return rolesFiltered.length > 0;
  }
}
