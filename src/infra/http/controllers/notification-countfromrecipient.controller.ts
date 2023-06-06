import { Controller, Get, Param } from '@nestjs/common';
import { CountRecipientNotification } from '@application/use-cases/count-recipient-notification';

@Controller('notifications')
export class NotificationCountFromRecipientController {
  constructor(
    private readonly countFromRecipientNotification: CountRecipientNotification,
  ) {}

  @Get('count/from/:recipientId')
  async countFromRecipient(
    @Param('recipientId') recipient_id: string,
  ): Promise<{ count: number }> {
    const { count } = await this.countFromRecipientNotification.execute({
      recipient_id: recipient_id,
    });
    return {
      count,
    };
  }
}
