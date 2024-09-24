import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { EnvVariables } from 'src/config/config.types';
import {
  PassportStrategies,
  JwtUserPayload,
  JwtIntegrationAuthPayload,
} from '../auth.types';

@Injectable()
export class JwtQueryParamStateIntegrationStrategy extends PassportStrategy(
  Strategy,
  PassportStrategies.JWT_QUERY_PARAM_STATE_INTEGRATION,
) {
  constructor(private readonly configService: ConfigService<EnvVariables>) {
    super({
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('SIGNING_SECRET'),
    });
  }

  async validate(payload: JwtIntegrationAuthPayload) {
    return payload;
  }
}
