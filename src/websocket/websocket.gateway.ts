import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { OnModuleInit, Inject } from '@nestjs/common';
import { Server } from 'socket.io';
import { REDIS_CLIENT } from '../redis/redis.module';
import Redis from 'ioredis';

@WebSocketGateway({ cors: true })
export class WebsocketGateway implements OnModuleInit {
  @WebSocketServer() server: Server;

  constructor(@Inject(REDIS_CLIENT) private readonly redis: Redis) {}

  async onModuleInit() {
    // duplicate() is already in connecting state
    const subscriber = this.redis.duplicate();
    await subscriber.subscribe('route-updates');

    subscriber.on('message', (_: string, message: string) => {
      const geojson = JSON.parse(message);
      this.server.emit('route-update', geojson); // forward to clients
    });
  }
}
