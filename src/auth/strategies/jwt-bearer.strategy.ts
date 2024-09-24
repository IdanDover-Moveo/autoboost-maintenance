import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { EnvVariables } from 'src/config/config.types';
import { JwtUserPayload, PassportStrategies } from '../auth.types';

@Injectable()
export class JwtBearerStrategy extends PassportStrategy(
  Strategy,
  PassportStrategies.JWT_BEARER,
) {
  constructor(private readonly configService: ConfigService<EnvVariables>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
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
