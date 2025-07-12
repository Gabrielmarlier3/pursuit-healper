// src/seeder/seeder.service.ts
import { Injectable, Logger, Inject, OnApplicationBootstrap } from '@nestjs/common';
import Redis from 'ioredis';
import { REDIS_CLIENT } from '../redis/redis.module';
import { vehicleSeeds } from '../../seeds/vehicles.seed';

@Injectable()
export class SeederService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SeederService.name);

  constructor(@Inject(REDIS_CLIENT) private readonly redis: Redis) {}

  async onApplicationBootstrap() {
    if (process.env.NODE_ENV === 'production') {
      this.logger.log('Seeder não executado em produção');
      return;
    }
    const exists = await this.redis.exists('fleet');
    if (exists) {
      this.logger.log('Redis já contém dados — seed ignorado');
      return;
    }

    for (const v of vehicleSeeds) {
      await this.redis.geoadd('fleet', v.lon, v.lat, `${v.id}:${v.vehicleType}`);
    }
    this.logger.log(`Seed de ${vehicleSeeds.length} viaturas inserido em Redis`);
  }
}
