import { Injectable } from '@nestjs/common';
import { Content } from '../entities/content';
import { Notification } from '../entities/notification';
import { INotificationRepository } from '../repositories/notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';

interface IGetRecipientNotificationRequest {
  recipient_id: string;
}

interface GetRecipientNotificationResponse {
  notifications: Notification[];
}

@Injectable()
export class GetRecipientNotification {
  constructor(private notificationRepository: INotificationRepository) {}

  async execute(
    request: IGetRecipientNotificationRequest,
  ): Promise<GetRecipientNotificationResponse> {
    const { recipient_id } = request;
    const notifications =
      await this.notificationRepository.findManyByRecipientId(recipient_id);
    return {
      notifications,
    };
  }
}
