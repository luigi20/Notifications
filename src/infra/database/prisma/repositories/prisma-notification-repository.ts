import { Injectable } from '@nestjs/common';
import { Notification } from '@application/entities/notification';
import { INotificationRepository } from '@application/repositories/notifications-repository';
import { PrismaService } from '../prisma.service';
import { PrismaNotificationMapper } from 'src/prisma/PrismaNotificationMapper';
import { NotificationViewModel } from '@infra/view-models/notification-view-model';
import { count } from 'rxjs';

@Injectable()
export class PrismaNotificationRepository implements INotificationRepository {
  constructor(private prisma: PrismaService) {}

  async save(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);
    await this.prisma.notification.update({
      where: {
        id: raw.id,
      },
      data: raw,
    });
  }

  async countManyByRecipientId(recipient_id: string): Promise<number> {
    const count = await this.prisma.notification.count({
      where: {
        recipient_id: recipient_id,
      },
    });
    return count;
  }

  async findManyByRecipientId(recipient_id: string): Promise<Notification[]> {
    const notifications = await this.prisma.notification.findMany({
      where: {
        recipient_id: recipient_id,
      },
    });
    return notifications.map(PrismaNotificationMapper.toDomain);
  }

  async findById(notification_id: string): Promise<Notification | null> {
    const notification = await this.prisma.notification.findUnique({
      where: {
        id: notification_id,
      },
    });
    if (!notification) return null;
    return PrismaNotificationMapper.toDomain(notification);
  }
  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);
    await this.prisma.notification.create({
      data: raw,
    });
  }
}
