import { Module } from '@nestjs/common';
import { SendNotification } from '@application/use-cases/send-notification';
import { PrismaService } from '../database/prisma/prisma.service';
import { DatabaseModule } from '../database/database.module';
import { NotificationCancelController } from './controllers/notification-cancel.controller';
import { NotificationCountFromRecipientController } from './controllers/notification-countfromrecipient.controller';
import { NotificationCreateController } from './controllers/notification-create.controller';
import { NotificationReadController } from './controllers/notification-read.controller';
import { NotificationUnReadController } from './controllers/notification-unread.controller';
import { NotificationGetFromRecipientController } from './controllers/notification-getfromrecipient.controller';
import { CancelNotification } from '@application/use-cases/cancel-notification';
import { GetRecipientNotification } from '@application/use-cases/get-recipient-notification';
import { ReadNotification } from '@application/use-cases/read-notification';
import { UnReadNotification } from '@application/use-cases/unread-notification';
import { CountRecipientNotification } from '@application/use-cases/count-recipient-notification';

@Module({
  imports: [DatabaseModule],
  controllers: [
    NotificationCancelController,
    NotificationCountFromRecipientController,
    NotificationCreateController,
    NotificationReadController,
    NotificationUnReadController,
    NotificationGetFromRecipientController,
  ],
  providers: [
    SendNotification,
    CancelNotification,
    GetRecipientNotification,
    ReadNotification,
    UnReadNotification,
    CountRecipientNotification,
    PrismaService,
  ],
})
export class HttpModule {}
