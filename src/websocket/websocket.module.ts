import { Module } from '@nestjs/common';
import { RedisModule } from 'nestjs-redis';
import { WebsocketGateway } from './websocket.gateway';

@Module({
  imports: [RedisModule],
  providers: [WebsocketGateway],
})
export class WebsocketModule {