import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { LocationService } from '../location/location.service';
import { ConfigService } from '@nestjs/config';

type LatLng = { latitude: number; longitude: number };

@Injectable()
export class RouteService {
    private readonly logger = new Logger(RouteService.name);
    private readonly osrmUrl: string;

    constructor(
        private readonly http: HttpService,
        private readonly locSvc: LocationService,
        config: ConfigService,
    ) {
        this.osrmUrl = config.get<string>('OSRM_URL', 'http://localhost:5000');
    }

    async getRoute(): Promise<any> {
        const a = this.locSvc.get('A');
        const b = this.locSvc.get('B');
        if (!a || !b) return null;

        const coords = `${a.longitude},${a.latitude};${b.longitude},${b.latitude}`;
        const url = `${this.osrmUrl}/route/v1/driving/${coords}?overview=full&geometries=geojson`;

        const response$ = this.http.get(url);
        const response = await firstValueFrom(response$);
        return response.data;
    }
}
