import { randomUUID } from 'crypto';
import { SendNotification } from './send-notification';
import { inMemoryNotificationRepository } from '@test/repositories/in-memory-notifications-repositories';

describe('Send Notification', () => {
  it('should be able to send a notification', async () => {
    const notificationRepository = new inMemoryNotificationRepository();
    const sendNotification = new SendNotification(notificationRepository);
    const { notification } = await sendNotification.execute({
      category: 'social',
      content: 'Teste 10',
      recipient_id: randomUUID(),
    });
    expect(notificationRepository.notifications).toHaveLength(1);
    expect(notificationRepository.notifications[0]).toEqual(notification);
  });
});
