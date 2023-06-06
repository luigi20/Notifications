import { Body, Controller, Post } from '@nestjs/common';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { SendNotification } from 'src/application/use-cases/send-notification';
import { NotificationViewModel } from '@infra/view-models/notification-view-model';

@Controller('notifications')
export class NotificationCreateController {
  constructor(private readonly sendNotification: SendNotification) {}

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipient_id, category, content } = body;
    const { notification } = await this.sendNotification.execute({
      category: category,
      content: content,
      recipient_id: recipient_id,
    });
    return {
      notification: NotificationViewModel.toHttp(notification),
    };
  }
}
