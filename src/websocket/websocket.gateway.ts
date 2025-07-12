import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { OnModuleInit, Inject } from '@nestjs/common';
import Redis from 'ioredis';
import { Server } from 'socket.io';
import { REDIS_CLIENT } from '../redis/redis.module';

@WebSocketGateway({ cors: { origin: '*' } })
export class WebsocketGateway implements OnModuleInit {
  @WebSocketServer() server: Server;

  constructor(
    @Inject(REDIS_CLIENT) private readonly redis: Redis,
  ) {}

  async onModuleInit() {
    // Assina canais de rotas individuais
    const routeSub = this.redis.duplicate();
    await routeSub.psubscribe('route-*');

    routeSub.on('pmessage', (_pattern, channel, message) => {
      const [, vehicleId] = channel.split('-');
      const data = JSON.parse(message);
      this.server.to(vehicleId).emit('route-update', data);
    });

    // Assina atualizações gerais da frota
    const fleetSub = this.redis.duplicate();
    await fleetSub.subscribe('fleet-update');

    fleetSub.on('message', (_channel, message) => {
      const update = JSON.parse(message);
      this.server.to('central').emit('fleet-update', [update]);
    });

    // Gerencia conexões WebSocket
    this.server.on('connection', socket => {
      socket.on('identify', ({ id, role }: { id: string; role: string }) => {
        if (role === 'central') {
          socket.join('central');
        } else {
          socket.join(id);
        }
      });
    });
  }
}
