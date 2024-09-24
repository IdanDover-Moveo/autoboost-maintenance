import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { EnvVariables } from 'src/config/config.types';
import { PassportStrategies, JwtUserPayload } from '../auth.types';

@Injectable()
export class JwtQueryParamStateStrategy extends PassportStrategy(
  Strategy,
  PassportStrategies.JWT_QUERY_PARAM_STATE_CLIENT,
) {
  constructor(private readonly configService: ConfigService<EnvVariables>) {
    super({
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter('state'),
      ignoreExpiration: false,
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
