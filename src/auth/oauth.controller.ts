import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { OauthService } from './oauth.service';
import { EnvVariables } from 'src/config/config.types';
import { OAuthGuard } from './guards/oauth.guard';

@UseGuards(OAuthGuard)
@Controller('oauth')
export class OauthController {
  constructor(
    private readonly configService: ConfigService<EnvVariables>,
    private readonly oauthService: OauthService,
  ) {}

  @Get()
  startOauth2(
    @Res() res: Response,
    @Query('state') sessionToken: string | undefined,
    @Query('subdomain') subdomain: string | undefined,
    @Query('origin') origin_url: string | undefined,
  ) {
    const newSessionToken = this.oauthService.addVariablesToTokenPayload(
      sessionToken,
      { origin_url },
    );

    return res.redirect(
      `https://auth.monday.com/oauth2/authorize?client_id=${this.configService.get('CLIENT_ID')}&redirect_uri=${this.configService.get('REDIRECT_URI')}&app_version_id=${this.configService.get('APP_VERSION_ID')}&state=${newSessionToken}${subdomain ? '&subdomain=' + subdomain : ''}`,
    );
  }

  @Get('callback')
  async callback(
    @Res() res: Response,
    @Query('code') code: string | undefined,
    @Query('scope') scope: string | undefined,
    @Query('state') sessionToken: string | undefined,
  ) {
    const originUrl = await this.oauthService.secureAccessToken(
      code,
      scope,
      sessionToken,
    );

    return res.redirect(originUrl);
  }
}
