import { Injectable, Logger, Inject } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { RouteService } from '../route/route.service';
import { REDIS_CLIENT } from '../redis/redis.module';
import Redis from 'ioredis';

@Injectable()
export class TasksService {
    private readonly logger = new Logger(TasksService.name);

    constructor(
        private readonly routeSvc: RouteService,
        @Inject(REDIS_CLIENT) private readonly redis: Redis,
    ) {}

    @Interval(5000)
    async publishRoute() {
        const data = await this.routeSvc.getRoute();
        if (data) {
            const payload = JSON.stringify(data.routes?.[0]?.geometry);
            await this.redis.publish('route-updates', payload);
            this.logger.log('route-updates published');
        }
    }
}
