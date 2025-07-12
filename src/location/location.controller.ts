import { Controller, Post, Body, Req, Inject } from '@nestjs/common';
import { Request } from 'express';
import { LocationService } from './location.service';
import { UpdateLocationDto } from './dto/location.dto';
import { JwtPayload } from '../auth/interface/JwtPayload.interface';
import { REDIS_CLIENT } from '../redis/redis.module';
import Redis from 'ioredis';

@Controller('location')
export class LocationController {
  constructor(
    private readonly locSvc: LocationService,
    @Inject(REDIS_CLIENT) private redis: Redis,
  ) {
  }

  @Post('update') async update(@Req() req: Request, @Body() dto: UpdateLocationDto) {
    const user = req.user as JwtPayload;
    this.locSvc.set(user.sub, { latitude: dto.latitude, longitude: dto.longitude }, user.vt);
    this.redis.publish(
      'fleet-update',
      JSON.stringify({
        id: user.sub,
        latitude: dto.latitude,
        longitude: dto.longitude,
        vehicleType: user.vt,
      }),
    );
    return { status: 'OK' };
  }
}
