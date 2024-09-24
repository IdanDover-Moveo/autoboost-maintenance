import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { EnvVariables } from 'src/config/config.types';
import { AppException } from 'src/exceptions/app.exception';
import { MondayLoggerService } from 'src/monday/monday-logger.service';

@Injectable()
@Catch(AppException)
export class AppExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly mLogger: MondayLoggerService,
    private readonly configService: ConfigService<EnvVariables>,
  ) {}

  catch(exception: AppException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.message;
    const log = exception.getLogMessage();
    const isDevelopment =
      this.configService.getOrThrow('NODE_ENV') === 'development';

    this.mLogger.error(
      `${request.method} ${request.url} | LOG -- ${log} | Account ID: ${request.user?.account_id ?? 'NONE'} | User ID: ${request.user?.user_id ?? 'NONE'}`,
    );
    response.status(status).json({
      statusCode: status,
      message,
      logMessage: isDevelopment ? log : undefined,
      stack: isDevelopment ? exception.stack : undefined,
    });
  }
}
