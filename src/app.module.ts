import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from './redis/redis.module';
import { LocationModule } from './location/location.module';
import { RouteModule } from './route/route.module';
import { WebsocketModule } from './websocket/websocket.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { SeederModule } from './seeder/seeder.module';
import { RolesGuard } from './common/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { FleetModule } from './fleet/fleet.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // loads .env
    ScheduleModule.forRoot(),
    HttpModule,
    RedisModule,
    LocationModule,
    RouteModule,
    WebsocketModule,
    AuthModule,
    UserModule,
    SeederModule,
    FleetModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: RolesGuard }]
})
export class AppModule {}
