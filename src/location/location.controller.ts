import { Controller, Post, Body } from '@nestjs/common';
import { LocationService } from './location.service';
import { UpdateLocationDto } from './dto/location.dto';

@Controller('location')
export class LocationController {
    constructor(private readonly locSvc: LocationService) {}

    @Post('update')
    update(@Body() dto: UpdateLocationDto) {
        this.locSvc.update(dto.id, { latitude: dto.latitude, longitude: dto.longitude });
        return { status: 'OK' };
    }
}
