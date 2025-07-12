import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { LocationService } from '../location/location.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RouteService {
    private osrmUrl: string;

    constructor(
      private http: HttpService,
      private locSvc: LocationService,
      cfg: ConfigService,
    ) {
        this.osrmUrl = cfg.get<string>('OSRM_URL', 'http://localhost:5000');
    }

    /** rota entre dois pontos já registrados no LocationService */
    async getRouteBetween(fromId: string, toId: string): Promise<any | null> {
        const from = this.locSvc.get(fromId);
        const to   = this.locSvc.get(toId);
        if (!from || !to) return null;

        const { longitude: lonA, latitude: latA } = from.coord;
        const { longitude: lonB, latitude: latB } = to.coord;

        const coords = `${lonA},${latA};${lonB},${latB}`;
        const url = `${this.osrmUrl}/route/v1/driving/${coords}?overview=full&geometries=geojson`;
        const { data } = await firstValueFrom(this.http.get(url));
        return data;
    }
}
