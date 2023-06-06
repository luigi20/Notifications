import { Controller, Param, Patch } from '@nestjs/common';
import { UnReadNotification } from '@application/use-cases/unread-notification';

@Controller('notifications')
export class NotificationUnReadController {
  constructor(private readonly unreadNotification: UnReadNotification) {}

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({
      notification_id: id,
    });
  }
}
