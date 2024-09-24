import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { EnvVariables } from 'src/config/config.types';
import {
  IntegrationData,
  JwtUserPayload,
  PassportStrategies,
} from '../auth.types';
import { Request } from 'express';

@Injectable()
export class JwtSigningSecretStrategy extends PassportStrategy(
  Strategy,
  PassportStrategies.JWT_SIGNING_SECRET,
) {
  constructor(private readonly configService: ConfigService<EnvVariables>) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req.headers?.authorization ?? null;
        },
      ]),
      ignoreExpiration: true,
      secretOrKey: configService.get<string>('SIGNING_SECRET'),
    });
  }

  async validate(payload: IntegrationData) {
    return payload;
  }
}
