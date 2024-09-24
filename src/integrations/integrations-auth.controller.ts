import { TokensService } from './../auth/tokens.service';
import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { AuthService } from 'src/auth/auth.service';
import { EnvVariables } from 'src/config/config.types';
import {
  JwtIntegrationAuthPayload,
  JwtOAuthPayload,
} from 'src/auth/auth.types';
import { IntegrationAuthGuard } from 'src/auth/guards/integration-auth.guard';

@UseGuards(IntegrationAuthGuard)
@Controller('integrations')
export class IntegrationsAuthController {
  constructor(
    private readonly configService: ConfigService<EnvVariables>,
    private readonly authService: AuthService,
    private readonly tokensService: TokensService,
  ) {}

  @Get('auth')
  async auth(@Res() res: Response, @Query('token') token: string) {
    const { accountId, userId, backToUrl }: JwtIntegrationAuthPayload =
      this.authService.verify(token, {
        secret: this.configService.getOrThrow<'string'>('SIGNING_SECRET'),
      });

    const accessToken = await this.tokensService.getAccessToken(
      accountId,
      userId,
    );

    if (!accessToken) {
      const oAuthPayload: JwtOAuthPayload = {
        dat: {
          client_id: this.configService.getOrThrow<string>('CLIENT_ID'),
          user_id: userId,
          account_id: accountId,
          slug: '',
          app_id: +this.configService.getOrThrow<string>('APP_ID'),
          app_version_id:
            +this.configService.getOrThrow<string>('APP_VERSION_ID'),
          install_id: 0,
          is_admin: false,
          is_view_only: false,
          is_guest: false,
          user_kind: '',
          origin_url: backToUrl,
        },
      };
      const oAuthToken = this.authService.sign(oAuthPayload, {
        secret: this.configService.getOrThrow<'string'>('CLIENT_SECRET'),
      });
      return res.redirect(
        `https://auth.monday.com/oauth2/authorize?client_id=${this.configService.get('CLIENT_ID')}&redirect_uri=${this.configService.get('REDIRECT_URI')}&app_version_id=${this.configService.get('APP_VERSION_ID')}&state=${oAuthToken}`,
      );
    }

    return res.redirect(backToUrl);
  }
}
