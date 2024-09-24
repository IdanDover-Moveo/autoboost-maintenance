export interface RedirectResponse {
  access_token: string;
  token_type: string;
  scope: string;
}

export interface JwtAccessTokenResponsePayload {
  tid: number;
  aai: number;
  uid: number;
  iad: string;
  per: string;
  actid: number;
  rgn: string;
}

export interface JwtUserPayload {
  dat: UserData;
}

export interface JwtOAuthPayload {
  dat: UserData & { origin_url: string };
}

export interface JwtIntegrationAuthPayload {
  userId: number;
  accountId: number;
  backToUrl: string;
}

export interface IntegrationData {
  accountId: number;
  userId: number;
  aud: string;
  exp: number;
  shortLivedToken: string;
  iat: number;
}

export interface UserData {
  client_id: string;
  user_id: number;
  account_id: number;
  slug: string;
  app_id: number;
  app_version_id: number;
  install_id: number;
  is_admin: boolean;
  is_view_only: boolean;
  is_guest: boolean;
  user_kind: string;
}

export interface SecureStorageUserToken {
  userId: number;
  scopes: string;
  accessToken: string;
}

export interface SecureStorageAccountData {
  [key: string]: SecureStorageUserToken;
}

export enum PassportStrategies {
  JWT_BEARER = 'jwt-bearer',
  JWT_QUERY_PARAM_STATE_CLIENT = 'jwt-query-param-state',
  JWT_QUERY_PARAM_STATE_INTEGRATION = 'jwt-query-param-state-integration',
  JWT_CLIENT_SECRET = 'jwt-client-secret',
  JWT_SIGNING_SECRET = 'jwt-signing-secret',
}
