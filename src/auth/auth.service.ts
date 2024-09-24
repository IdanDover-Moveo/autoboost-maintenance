import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';
import { AppException } from 'src/exceptions/app.exception';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  decode<T>(token: string): T {
    try {
      return this.jwtService.decode<T>(token);
    } catch (error) {
      throw new AppException(
        'Invalid token',
        HttpStatus.BAD_REQUEST,
        `There was an invalid token sent, tried to decode token:${token} | error: ${error}`,
      );
    }
  }

  verify<T extends object>(token: string, options?: JwtVerifyOptions): T {
    try {
      return this.jwtService.verify<T>(token, options);
    } catch (error) {
      throw new AppException(
        'Invalid token',
        HttpStatus.BAD_REQUEST,
        `There was an invalid token sent, tried to validate token:${token} | error: ${error}`,
      );
    }
  }

  sign<T extends object>(payload: T, options?: JwtSignOptions) {
    try {
      return this.jwtService.sign(payload, options);
    } catch (error) {
      throw new AppException(
        'Was not able to create token',
        HttpStatus.INTERNAL_SERVER_ERROR,
        `not able to create the token for this payload: ${JSON.stringify(payload)}`,
      );
    }
  }
}
