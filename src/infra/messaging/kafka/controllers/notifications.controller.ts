import { SendNotification } from '@application/use-cases/send-notification';
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

interface SendNotificationPayload {
  content: string;
  category: string;
  recipient_id: string;
}

@Controller()
export class NotificationsController {
  constructor(private sendNotification: SendNotification) {}
  @EventPattern('notifications.send-notification')
  async HandleSendNotification(
    @Payload() { content, category, recipient_id }: SendNotificationPayload,
  ) {
    await this.sendNotification.execute({
      category,
      content,
      recipient_id: recipient_id,
    });
  }
}
