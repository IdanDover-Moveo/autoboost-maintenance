import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PassportStrategies } from '../auth.types';

@Injectable()
export class AppEventsGuard extends AuthGuard([
  PassportStrategies.JWT_CLIENT_SECRET,
  PassportStrategies.JWT_SIGNING_SECRET,
]) {}
