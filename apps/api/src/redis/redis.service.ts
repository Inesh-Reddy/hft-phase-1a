import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import redisClient from '@repo/redis-client';
import { RedisClientType } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  client: RedisClientType;

  onModuleInit() {
    this.client = redisClient;
  }

  onModuleDestroy() {
    this.client.destroy();
  }
  //subcribe
  async subscribe(
    channel: string,
    onMessage: (msg: string) => void,
  ): Promise<() => Promise<void>> {
    const subscriber = this.client.duplicate();
    await subscriber.connect();
    await subscriber.subscribe(channel, onMessage);
    return async () => {
      await subscriber.unsubscribe(channel);
      await subscriber.quit();
    };
  }
  // publish
  async publish(channel: string, message: string) {
    await this.client.publish(channel, message);
  }
}
