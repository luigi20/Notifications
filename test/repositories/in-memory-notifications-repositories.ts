import { INotificationRepository } from '@application/repositories/notifications-repository';
import { Notification } from '@application/entities/notification';

export class inMemoryNotificationRepository implements INotificationRepository {
  public notifications: Notification[] = [];
  async create(notification: Notification) {
    this.notifications.push(notification);
  }

  async findManyByRecipientId(recipient_id: string): Promise<Notification[]> {
    return this.notifications.filter(
      (notifications) => notifications.recipient_id === recipient_id,
    );
  }

  async countManyByRecipientId(recipient_id: string): Promise<number> {
    return this.notifications.filter(
      (notifications) => notifications.recipient_id === recipient_id,
    ).length;
  }

  async findById(notification_id: string): Promise<Notification | null> {
    const notification = this.notifications.find(
      (item) => item.id === notification_id,
    );
    if (!notification) {
      return null;
    }
    return notification;
  }
  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.notifications.findIndex(
      (item) => item.id === notification.id,
    );
    if (notificationIndex >= 0) {
      this.notifications[notificationIndex] = notification;
    }
  }
}
