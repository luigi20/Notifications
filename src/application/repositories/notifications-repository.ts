import { Notification } from '../entities/notification';

export abstract class INotificationRepository {
  abstract create(notification: Notification): Promise<void>;
  abstract findById(notification_id: string): Promise<Notification | null>;
  abstract save(notification: Notification): Promise<void>;
  abstract countManyByRecipientId(recipient_id: string): Promise<number>;
  abstract findManyByRecipientId(recipient_id: string): Promise<Notification[]>;
}
