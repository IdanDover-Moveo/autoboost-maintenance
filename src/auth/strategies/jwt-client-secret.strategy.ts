import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { EnvVariables } from 'src/config/config.types';
import { JwtUserPayload, PassportStrategies } from '../auth.types';
import { Request } from 'express';

@Injectable()
export class JwtClientSecretStrategy extends PassportStrategy(
  Strategy,
  PassportStrategies.JWT_CLIENT_SECRET,
) {
  constructor(private readonly configService: ConfigService<EnvVariables>) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req.headers?.authorization ?? null;
        },
      ]),
      ignoreExpiration: true,
      secretOrKey: configService.get<string>('CLIENT_SECRET'),
    });
  }

  async validate(payload: JwtUserPayload) {
    const user = payload.dat;

    if (user.app_id !== +this.configService.getOrThrow<string>('APP_ID')) {
      return false;
    }
    return user;
  }
}
