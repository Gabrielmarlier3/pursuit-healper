import { Module } from '@nestjs/common';
import { FleetController } from './fleet.controller';
import { LocationModule } from '../location/location.module';

@Module({
  imports: [LocationModule],
  controllers: [FleetController],
})
export class FleetModule {}
