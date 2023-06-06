import { inMemoryNotificationRepository } from '@test/repositories/in-memory-notifications-repositories';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './errors/notification-not-found';
import { makeNotification } from '@test/factories/notification-factory';

describe('Cancel Notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationRepository = new inMemoryNotificationRepository();
    const cancelNotification = new CancelNotification(notificationRepository);
    const notification = makeNotification();
    await notificationRepository.create(notification);
    await cancelNotification.execute({
      notification_id: notification.id,
    });
    expect(notificationRepository.notifications[0].cancelAt).toEqual(
      expect.any(Date),
    );
  });

  it('should be not be able cancel notification when it does not exist', async () => {
    const notificationRepository = new inMemoryNotificationRepository();
    const cancelNotification = new CancelNotification(notificationRepository);
    expect(() => {
      return cancelNotification.execute({
        notification_id: 'fake notification id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
