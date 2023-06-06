import { inMemoryNotificationRepository } from '@test/repositories/in-memory-notifications-repositories';
import { NotificationNotFound } from './errors/notification-not-found';
import { makeNotification } from '@test/factories/notification-factory';
import { ReadNotification } from './read-notification';

describe('Read Notification', () => {
  it('should be able to read a notification', async () => {
    const notificationRepository = new inMemoryNotificationRepository();
    const readNotification = new ReadNotification(notificationRepository);
    const notification = makeNotification();
    await notificationRepository.create(notification);
    await readNotification.execute({
      notification_id: notification.id,
    });
    expect(notificationRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should be not be able read notification when it does not exist', async () => {
    const notificationRepository = new inMemoryNotificationRepository();
    const readNotification = new ReadNotification(notificationRepository);
    expect(() => {
      return readNotification.execute({
        notification_id: 'fake notification id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
