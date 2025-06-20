import { Module } from '@nestjs/common';
import { RedisModule } from '../redis/redis.module';
import { WebsocketGateway } from './websocket.gateway';

@Module({
  imports: [RedisModule],
  providers: [WebsocketGateway],
})
export class WebsocketModule {}