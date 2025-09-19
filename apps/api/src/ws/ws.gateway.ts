import { WebSocketGateway } from '@nestjs/websockets';
import { mapRedisTrade, TickerUpdate } from '@repo/types';
import { RedisService } from 'src/redis/redis.service';

@WebSocketGateway({ path: '/ws' })
export class WsGateway {
  constructor(private readonly redisService: RedisService) {}
  afterInit() {
    console.log('WebSocket gateway initialized');
  }

  handleConnection = async (client: WebSocket) => {
    client.send(`Hello Binance`);
    await this.redisService.subscribe(
      'market.ticker.BTCUSDT.binance',
      (msg: string) => {
        const newData: TickerUpdate = mapRedisTrade(msg);
        client.send(JSON.stringify(newData));
      },
    );
  };
}
