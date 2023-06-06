import { Injectable } from '@nestjs/common';
import { INotificationRepository } from '../repositories/notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';

interface IUnReadNotificationRequest {
  notification_id: string;
}

type UnReadNotificationResponse = void;

@Injectable()
export class UnReadNotification {
  constructor(private notificationRepository: INotificationRepository) {}

  async execute(
    request: IUnReadNotificationRequest,
  ): Promise<UnReadNotificationResponse> {
    const { notification_id } = request;
    const notification = await this.notificationRepository.findById(
      notification_id,
    );
    if (!notification) {
      throw new NotificationNotFound();
    }
    notification.unread();
    await this.notificationRepository.save(notification);
  }
}
