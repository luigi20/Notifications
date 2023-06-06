import { Injectable } from '@nestjs/common';
import { INotificationRepository } from '../repositories/notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';

interface IReadNotificationRequest {
  notification_id: string;
}

type ReadNotificationResponse = void;

@Injectable()
export class ReadNotification {
  constructor(private notificationRepository: INotificationRepository) {}

  async execute(
    request: IReadNotificationRequest,
  ): Promise<ReadNotificationResponse> {
    const { notification_id } = request;
    const notification = await this.notificationRepository.findById(
      notification_id,
    );
    if (!notification) {
      throw new NotificationNotFound();
    }
    notification.read();
    await this.notificationRepository.save(notification);
  }
}
