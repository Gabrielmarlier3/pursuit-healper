import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { RouteModule } from '../route/route.module';

@Module({
    imports: [RouteModule],
    providers: [TasksService],
})
export class TasksModule {}