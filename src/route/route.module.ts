import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { RouteService } from './route.service';
import { RouteController } from './route.controller';
import { LocationModule } from '../location/location.module';

@Module({
  imports: [HttpModule, LocationModule],
  providers: [RouteService],
  controllers: [RouteController],
  exports: [RouteService],
})
export class RouteModule {}