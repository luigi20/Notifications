import { inMemoryNotificationRepository } from '@test/repositories/in-memory-notifications-repositories';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './errors/notification-not-found';
import { CountRecipientNotification } from './count-recipient-notification';
import { makeNotification } from '@test/factories/notification-factory';
import { GetRecipientNotification } from './get-recipient-notification';

describe('Get Notification', () => {
  it('should be able to get a notification', async () => {
    const notificationRepository = new inMemoryNotificationRepository();
    const getRecipientNotification = new GetRecipientNotification(
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
    const { notifications } = await getRecipientNotification.execute({
      recipient_id: 'recipient-1',
    });
    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipient_id: 'recipient-1' }),
        expect.objectContaining({ recipient_id: 'recipient-1' }),
      ]),
    );
  });
});
