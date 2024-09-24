import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { HttpModule } from '@nestjs/axios';
import { MondayModule } from 'src/monday/monday.module';
import { OauthController } from './oauth.controller';
import { OauthService } from './oauth.service';
import { JwtQueryParamStateStrategy } from './strategies/jwt-query-param-state.strategy';
import { JwtBearerStrategy } from './strategies/jwt-bearer.strategy';
import { JwtClientSecretStrategy } from './strategies/jwt-client-secret.strategy';
import { JwtSigningSecretStrategy } from './strategies/jwt-signing-secret.strategy';
import { TokensService } from './tokens.service';
import { JwtQueryParamStateIntegrationStrategy } from './strategies/jwt-query-param-state-integration.strategy';

@Module({
  imports: [
    PassportModule.register({ session: false }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('CLIENT_SECRET'),
      }),
    }),
    HttpModule,
    MondayModule,
  ],
  controllers: [OauthController],
  providers: [
    AuthService,
    OauthService,
    JwtBearerStrategy,
    JwtQueryParamStateStrategy,
    JwtQueryParamStateIntegrationStrategy,
    JwtClientSecretStrategy,
    JwtSigningSecretStrategy,
    TokensService,
  ],
  exports: [AuthService, TokensService],
})
export class AuthModule {}
