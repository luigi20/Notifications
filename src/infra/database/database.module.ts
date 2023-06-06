import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { INotificationRepository } from '@application/repositories/notifications-repository';
import { PrismaNotificationRepository } from './prisma/repositories/prisma-notification-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: INotificationRepository,
      useClass: PrismaNotificationRepository,
    },
  ],
  exports: [INotificationRepository],
})
export class DatabaseModule {}
