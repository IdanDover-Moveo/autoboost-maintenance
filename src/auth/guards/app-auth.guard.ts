import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PassportStrategies } from '../auth.types';

@Injectable()
export class AppAuthGuard extends AuthGuard(PassportStrategies.JWT_BEARER) {}
