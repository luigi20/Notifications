import { Injectable } from '@nestjs/common';
import { INotificationRepository } from '../repositories/notifications-repository';

interface ICountRecipientNotificationRequest {
  recipient_id: string;
}

interface CountRecipientNotificationResponse {
  count: number;
}

@Injectable()
export class CountRecipientNotification {
  constructor(private notificationRepository: INotificationRepository) {}

  async execute(
    request: ICountRecipientNotificationRequest,
  ): Promise<CountRecipientNotificationResponse> {
    const { recipient_id } = request;
    const count = await this.notificationRepository.countManyByRecipientId(
      recipient_id,
    );
    return {
      count,
    };
  }
}
