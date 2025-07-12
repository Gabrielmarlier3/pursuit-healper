import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { REDIS_CLIENT } from '../redis/redis.module';

type Coord = { latitude: number; longitude: number };
type CacheEntry = {
  coord: { latitude: number; longitude: number };
  vehicleType: string;
};

@Injectable()
export class LocationService {
  private mem = new Map<string, CacheEntry>();   // id → {coord, vt}

  constructor(@Inject(REDIS_CLIENT)private redis: Redis) {
  }

  async set(id: string, coord: Coord, vehicleType: string) {
    this.mem.set(id, { coord, vehicleType });
    await this.redis.geoadd('fleet', coord.longitude, coord.latitude, `${id}:${vehicleType}`);
  }

  get(id: string) {
    return this.mem.get(id);                     // undefined se não existir
  }

  all(): { id: string; coord: Coord; vehicleType: string }[] {
    return Array.from(this.mem.entries()).map(([id, v]) => ({ id, ...v }));
  }

  /** chamado no bootstrap para popular memória após restart */
  async warmup() {
    // 1) pega todos os membros do sorted-set 'fleet'
    const members = await this.redis.zrange('fleet', 0, -1);
    if (!members.length) return;

    const coords = await this.redis.geopos('fleet', ...members);

    for (let i = 0; i < members.length; i++) {
      const [lon, lat] = coords[i] || [];
      if (lon == null || lat == null) continue;

      const [id, vt] = members[i].split(':');
      this.mem.set(id, {
        coord: { latitude: +lat, longitude: +lon },
        vehicleType: vt,
      });
    }
  }

}
