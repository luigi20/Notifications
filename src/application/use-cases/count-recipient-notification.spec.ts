import { inMemoryNotificationRepository } from '@test/repositories/in-memory-notifications-repositories';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './errors/notification-not-found';
import { CountRecipientNotification } from './count-recipient-notification';
import { makeNotification } from '@test/factories/notification-factory';

describe('Count Notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationRepository = new inMemoryNotificationRepository();
    const countNotification = new CountRecipientNotification(
      notificationRepository,
    );
    await notificationRepository.create(
      makeNotification({
        recipient_id: 'recipient-1',
      }),
    );
    await notificationRepository.create(
      makeNotification({
        recipient_id: 'recipient-1',
      }),
    );
    await notificationRepository.create(
      makeNotification({
        recipient_id: 'recipient-2',
      }),
    );
    const { count } = await countNotification.execute({
      recipient_id: 'recipient-1',
    });
    expect(count).toEqual(2);
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
