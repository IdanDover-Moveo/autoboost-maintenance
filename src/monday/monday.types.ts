import { QueryVariables } from '@mondaydotcomorg/api';
import { UserData } from 'src/auth/auth.types';

export interface GraphQlBody {
  query: string;
  variables: QueryVariables | undefined;
}

export interface UseApiOptions {
  user: UserData;
  accessToken?: string;
}
