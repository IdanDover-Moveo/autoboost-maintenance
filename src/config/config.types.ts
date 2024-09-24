import { UserData } from 'src/auth/auth.types';

declare global {
  namespace Express {
    interface Request {
      user?: UserData;
    }
  }
}

declare global {
  type DataResponse<T> = { data: T };
}

export interface EnvVariables {
  NODE_ENV: string;
  PORT: string;
  APP_NAME: string;
  APP_ID: string;
  APP_VERSION_ID: string;
  CLIENT_ID: string;
  CLIENT_SECRET: string;
  SIGNING_SECRET: string;
  REDIRECT_URI: string;
}
