import { Test, TestingModule } from '@nestjs/testing';
import { OauthController } from './oauth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { MondayModule } from 'src/monday/monday.module';
import { AuthService } from './auth.service';
import { OauthService } from './oauth.service';
import { JwtAuthStrategy } from './jwt-auth.strategy';
import { JwtOAuthStrategy } from './jwt-oauth.strategy';

describe('OauthController', () => {
  let controller: OauthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
      providers: [AuthService, OauthService, JwtAuthStrategy, JwtOAuthStrategy],
    }).compile();

    controller = module.get<OauthController>(OauthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
