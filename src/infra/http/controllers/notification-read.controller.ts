import { Controller, Param, Patch } from '@nestjs/common';
import { ReadNotification } from '@application/use-cases/read-notification';

@Controller('notifications')
export class NotificationReadController {
  constructor(private readonly readNotification: ReadNotification) {}

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({
      notification_id: id,
    });
  }
}
