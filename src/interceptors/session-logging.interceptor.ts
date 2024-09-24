import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MondayLoggerService } from 'src/monday/monday-logger.service';

@Injectable()
export class SessionLoggingInterceptor implements NestInterceptor {
  constructor(private readonly mLogger: MondayLoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest();
    const { method, url, user } = request;

    return next.handle().pipe(
      tap(() => {
        this.mLogger.info(
          `${method} ${url} | LOG -- Account ID: ${user?.account_id ?? 'NONE'} | User ID: ${user?.user_id ?? 'NONE'}`,
        );
      }),
    );
  }
}
