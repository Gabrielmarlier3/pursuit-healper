import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { RouteService } from './route.service';

@Controller('route')
export class RouteController {
    constructor(private readonly routeSvc: RouteService) {}

    @Get(':fromId/:toId')
    async find(
      @Param('fromId') fromId: string,
      @Param('toId') toId: string,
    ) {
        const route = await this.routeSvc.getRouteBetween(fromId, toId);
        if (!route) throw new NotFoundException('Um ou ambos os IDs não encontrados');
        return route;
    }
}
