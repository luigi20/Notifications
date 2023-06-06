import { Injectable } from '@nestjs/common';
import { Content } from '../entities/content';
import { Notification } from '../entities/notification';
import { INotificationRepository } from '../repositories/notifications-repository';

interface INotificationRequest {
  recipient_id: string;
  content: string;
  category: string;
}

interface SendNotificationResponse {
  notification: Notification;
}

@Injectable()
export class SendNotification {
  constructor(private notificationRepository: INotificationRepository) {}

  async execute(
    request: INotificationRequest,
  ): Promise<SendNotificationResponse> {
    const { recipient_id, content, category } = request;
    const notification = new Notification({
      category: category,
      recipient_id: recipient_id,
      content: new Content(content),
    });
    await this.notificationRepository.create(notification);
    return {
      notification,
    };
  }
}
