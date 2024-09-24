import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PassportStrategies } from '../auth.types';

@Injectable()
export class IntegrationAuthGuard extends AuthGuard(
  PassportStrategies.JWT_QUERY_PARAM_STATE_INTEGRATION,
) {}
