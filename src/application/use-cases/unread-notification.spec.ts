import { inMemoryNotificationRepository } from '@test/repositories/in-memory-notifications-repositories';
import { NotificationNotFound } from './errors/notification-not-found';
import { makeNotification } from '@test/factories/notification-factory';
import { UnReadNotification } from './unread-notification';

describe('Unread Notification', () => {
  it('should be able to unread a notification', async () => {
    const notificationRepository = new inMemoryNotificationRepository();
    const unReadNotification = new UnReadNotification(notificationRepository);
    const notification = makeNotification({
      readAt: new Date(),
    });
    await notificationRepository.create(notification);
    await unReadNotification.execute({
      notification_id: notification.id,
    });
    expect(notificationRepository.notifications[0].readAt).toBeNull();
  });

  it('should be not be able unread notification when it does not exist', async () => {
    const notificationRepository = new inMemoryNotificationRepository();
    const unreadNotification = new UnReadNotification(notificationRepository);
    expect(() => {
      return unreadNotification.execute({
        notification_id: 'fake notification id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
