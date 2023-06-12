import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ServerKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaConsumerService
  extends ServerKafka
  implements OnModuleDestroy
{
  constructor() {
    super({
      client: {
        clientId: 'notifications',
        brokers: ['exotic-cattle-10516-us1-kafka.upstash.io:9092'],
        sasl: {
          mechanism: 'scram-sha-256',
          username:
            'ZXhvdGljLWNhdHRsZS0xMDUxNiSiYf6pHrMkfYiluWmKio6qsJ89smXi8jViXPU',
          password: 'ab996a7dcbf74b63abbdd3d7e0609a90',
        },
        ssl: true,
      },
    });
  }
  async onModuleDestroy() {
    await this.close();
  }
}
