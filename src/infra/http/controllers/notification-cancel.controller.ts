import { Controller, Param, Patch } from '@nestjs/common';
import { CancelNotification } from '@application/use-cases/cancel-notification';

@Controller('notifications')
export class NotificationCancelController {
  constructor(private readonly cancelNotification: CancelNotification) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({
      notification_id: id,
    });
  }
}
