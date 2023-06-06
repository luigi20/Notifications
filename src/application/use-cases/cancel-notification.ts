import { Injectable } from '@nestjs/common';
import { INotificationRepository } from '../repositories/notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';

interface ICancelNotificationRequest {
  notification_id: string;
}

type CancelNotificationResponse = void;

@Injectable()
export class CancelNotification {
  constructor(private notificationRepository: INotificationRepository) {}

  async execute(
    request: ICancelNotificationRequest,
  ): Promise<CancelNotificationResponse> {
    const { notification_id } = request;
    const notification = await this.notificationRepository.findById(
      notification_id,
    );
    if (!notification) {
      throw new NotificationNotFound();
    }
    notification.cancel();
    await this.notificationRepository.save(notification);
  }
}
