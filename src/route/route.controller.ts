import { Controller, Get } from '@nestjs/common';
import { RouteService } from './route.service';

@Controller('route')
export class RouteController {
    constructor(private readonly routeSvc: RouteService) {}

    @Get()
    async find() {
        const route = await this.routeSvc.getRoute();
        return route || { message: 'Aguardando posições A e B' };
    }
}