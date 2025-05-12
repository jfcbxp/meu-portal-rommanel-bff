import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class UserIdCheckMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    if (Number.isNaN(Number(req.params.id)) || Number(req.params.id) <= 0) {
      throw new BadRequestException('Id invalido');
    }
    next();
  }
}
