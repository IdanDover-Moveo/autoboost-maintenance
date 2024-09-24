import { HttpStatus, Injectable } from '@nestjs/common';
import { MondaySecureStorageService } from 'src/monday/monday-secure-storage.service';
import { AppEventBody, AppEventData } from './app-events.types';
import { MondayLoggerService } from 'src/monday/monday-logger.service';
import { AppException } from 'src/exceptions/app.exception';

@Injectable()
export class AppEventsService {
  constructor(
    private readonly mSecureStorage: MondaySecureStorageService,
    private readonly mLogger: MondayLoggerService,
  ) {}

  handleEvent(event?: AppEventBody) {
    if (!event || !event.type || !event.data) {
      throw new AppException(
        'Please provide the event that happened in the body of the request',
        HttpStatus.BAD_REQUEST,
        'An attempt to start an app event without providing the type and the data of the event',
      );
    }
    const { type, data } = event;
    this.mLogger.info(
      `start handling event: ${type} | User ID: ${data.user_id} | Account ID: ${data.account_id} `,
    );

    switch (type) {
      case 'install':
        return this.install(data);
      case 'uninstall':
        return this.uninstall(data);
      case 'app_subscription_created':
        return this.appSubscriptionCreated(data);
      case 'app_subscription_changed':
        return this.appSubscriptionChanged(data);
      case 'app_subscription_cancelled_by_user':
        return this.appSubscriptionCancelledByUser(data);
      case 'app_subscription_renewed':
        return this.appSubscriptionRenewed(data);
      case 'app_trial_subscription_started':
        return this.appTrialSubscriptionStarted(data);
      case 'app_trial_subscription_ended':
        return this.appTrialSubscriptionEnded(data);
      case 'app_subscription_cancelled':
        return this.appSubscriptionCancelled(data);
      case 'app_subscription_cancellation_revoked_by_user':
        return this.appSubscriptionCancellationRevokedByUser(data);
      case 'app_subscription_renewal_attempt_failed':
        return this.appSubscriptionRenewalAttemptFailed(data);
      case 'app_subscription_renewal_failed':
        return this.appSubscriptionRenewalFailed(data);
      default:
        throw new AppException(
          `Unhandled event type: ${type}`,
          HttpStatus.BAD_REQUEST,
        );
    }
  }

  async install(data: AppEventData) {
    const accounts = await this.mSecureStorage.get<number[]>('accounts');
    const accountsSet = new Set(accounts);
    accountsSet.add(data.account_id);
    this.mSecureStorage.set('accounts', [...accountsSet]);
    return 'handle event install successfully';
  }

  async uninstall(data: AppEventData) {
    this.mSecureStorage.delete(`${data.account_id}`);
    const accounts =
      (await this.mSecureStorage.get<number[]>('accounts')) ?? [];
    const accountRemoved = accounts.filter(
      (accountId) => accountId !== data.account_id,
    );
    this.mSecureStorage.set('accounts', accountRemoved);
    return 'handle event uninstall successfully';
  }

  appSubscriptionCreated(data: AppEventData) {
    return 'handle event app_subscription_created successfully';
  }

  appSubscriptionChanged(data: AppEventData) {
    return 'handle event app_subscription_changed successfully';
  }

  appSubscriptionCancelledByUser(data: AppEventData) {
    return 'handle event app_subscription_cancelled_by_user successfully';
  }

  appSubscriptionRenewed(data: AppEventData) {
    return 'handle event app_subscription_renewed successfully';
  }

  appTrialSubscriptionStarted(data: AppEventData) {
    return 'handle event app_trial_subscription_started successfully';
  }

  appTrialSubscriptionEnded(data: AppEventData) {
    return 'handle event app_trial_subscription_ended successfully';
  }

  appSubscriptionCancelled(data: AppEventData) {
    return 'handle event app_subscription_cancelled successfully';
  }

  appSubscriptionCancellationRevokedByUser(data: AppEventData) {
    return 'handle event app_subscription_cancellation_revoked_by_user successfully';
  }

  appSubscriptionRenewalAttemptFailed(data: AppEventData) {
    return 'handle event app_subscription_renewal_attempt_failed successfully';
  }

  appSubscriptionRenewalFailed(data: AppEventData) {
    return 'handle event app_subscription_renewal_failed successfully';
  }
}
