import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const CurrentUser = createParamDecorator(
  (_data: never, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
