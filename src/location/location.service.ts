import { Injectable } from '@nestjs/common';

type LatLng = { latitude: number; longitude: number };

@Injectable()
export class LocationService {
    private locations = new Map<'A' | 'B', LatLng>();

    //todo: implement multID
    update(id: 'A' | 'B', coords: LatLng) {
        this.locations.set(id, coords);
    }

    //todo: implement multID
    get(id: 'A' | 'B'): LatLng | undefined {
        return this.locations.get(id);
    }
}