// src/fleet/fleet.controller.ts
import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../common/roles.decorator';
import { LocationService } from '../location/location.service';

@Controller('fleet')
@UseGuards(JwtAuthGuard)
export class FleetController {
  constructor(private loc: LocationService) {}

  @Get()
  @Roles('central')
  list() {
    return this.loc.all().map(v => ({
      id: v.id,
      latitude:  v.coord.latitude,
      longitude: v.coord.longitude,
      vehicleType: v.vehicleType,
    }));
  }
}
