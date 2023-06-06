import { Controller, Get, Param } from '@nestjs/common';
import { CountRecipientNotification } from '@application/use-cases/count-recipient-notification';
import { GetRecipientNotification } from '@application/use-cases/get-recipient-notification';
import { NotificationViewModel } from '@infra/view-models/notification-view-model';

@Controller('notifications')
export class NotificationGetFromRecipientController {
  constructor(
    private readonly getFromRecipientNotification: GetRecipientNotification,
  ) {}

  @Get('from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipient_id: string) {
    const { notifications } = await this.getFromRecipientNotification.execute({
      recipient_id: recipient_id,
    });
    return {
      notification: notifications.map(NotificationViewModel.toHttp),
    };
  }
}
