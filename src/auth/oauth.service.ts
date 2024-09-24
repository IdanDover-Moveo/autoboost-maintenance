import { HttpService } from '@nestjs/axios';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { MondayLoggerService } from 'src/monday/monday-logger.service';
import {
  JwtAccessTokenResponsePayload,
  JwtOAuthPayload,
  JwtUserPayload,
  RedirectResponse,
  SecureStorageAccountData,
} from './auth.types';
import { MondaySecureStorageService } from 'src/monday/monday-secure-storage.service';
import { AuthService } from './auth.service';
import { EnvVariables } from 'src/config/config.types';
import { AppException } from 'src/exceptions/app.exception';

@Injectable()
export class OauthService {
  constructor(
    private readonly configService: ConfigService<EnvVariables>,
    private readonly authService: AuthService,
    private readonly httpService: HttpService,
    private readonly mLogger: MondayLoggerService,
    private readonly mSecureStorageService: MondaySecureStorageService,
  ) {}

  async secureAccessToken(
    code: string | undefined,
    scope: string | undefined,
    sessionToken: string | undefined,
  ): Promise<string> {
    if (!code || !scope || !sessionToken) {
      throw new AppException(
        'Monday did not provide the values to complete the oauth process, please try again',
        HttpStatus.BAD_REQUEST,
        'There was a problem securing the user token',
      );
    }

    const accessToken = await this.getAccessToken(
      code,
      this.configService.getOrThrow('REDIRECT_URI'),
    );
    const { actid: accountId, uid: userId } =
      this.authService.decode<JwtAccessTokenResponsePayload>(accessToken);

    let accountData =
      await this.mSecureStorageService.get<SecureStorageAccountData>(
        `${accountId}`,
      );
    if (!accountData) {
      accountData = {};
      const accountsArray =
        (await this.mSecureStorageService.get<number[]>('accounts')) ?? [];
      this.mSecureStorageService.set('accounts', [...accountsArray, accountId]);
    }

    const newAccountData = {
      ...accountData,
      [userId]: { userId, scope, accessToken },
    };

    const isSuccess = await this.mSecureStorageService.set(
      `${accountId}`,
      newAccountData,
    );

    if (!isSuccess) {
      throw new AppException(
        `Did not succeed in storing token for account: ${accountId} by user: ${userId}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
        `Did not succeed in storing token for account: ${accountId} by user: ${userId}`,
      );
    }
    this.mLogger.info(
      `Successfully stored access token for user: ${userId} in account: ${accountId}`,
    );

    const {
      dat: { origin_url },
    } = this.authService.verify<JwtOAuthPayload>(sessionToken);

    return origin_url;
  }

  addVariablesToTokenPayload(
    token: string | undefined,
    variables: { [T: string]: string | undefined },
  ) {
    if (!token) {
      throw new AppException(
        'There was no state state query param',
        HttpStatus.BAD_REQUEST,
        'Could not add admin to the access token accounts because there was no session token',
      );
    }
    const payload = this.authService.verify<JwtUserPayload>(token);
    const newData = {
      ...payload.dat,
      ...variables,
    };
    const newPayload = { dat: newData };

    const newSessionToken = this.authService.sign(newPayload);
    return newSessionToken;
  }

  private async getAccessToken(code: string, redirectUri: string) {
    const response = await firstValueFrom(
      this.httpService
        .post<RedirectResponse>('https://auth.monday.com/oauth2/token', {
          redirect_uri: redirectUri,
          client_id: this.configService.get('CLIENT_ID'),
          client_secret: this.configService.get('CLIENT_SECRET'),
          code,
        })
        .pipe(
          catchError((error: AxiosError<string>) => {
            throw new AppException(
              'Could not get your access token, please try again the oauth flow',
              HttpStatus.INTERNAL_SERVER_ERROR,
              error.response?.data || 'Unknown error',
            );
          }),
        ),
    );
    return response.data.access_token;
  }
}
