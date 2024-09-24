import { HttpException, HttpStatus } from '@nestjs/common';

export class AppException extends HttpException {
  private logMessage?: string;
  constructor(message: string, statusCode: HttpStatus, logMessage?: string) {
    super(message, statusCode);
    this.logMessage = logMessage ?? `message sent as response: ${message}`;
  }

  public getLogMessage(): string {
    return this.logMessage ?? this.message;
  }
}
