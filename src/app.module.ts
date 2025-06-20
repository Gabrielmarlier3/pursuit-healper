import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from './redis/redis.module';
import { LocationModule } from './location/location.module';
import { RouteModule } from './route/route.module';
import { TasksModule } from './tasks/tasks.module';
import { WebsocketModule } from './websocket/websocket.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // loads .env
    ScheduleModule.forRoot(),
    HttpModule,
    RedisModule,
    LocationModule,
    RouteModule,
    TasksModule,
    WebsocketModule,
  ],
})
export class AppModule {}
