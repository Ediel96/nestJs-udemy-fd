/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor (private tasksService : TasksService) {}

    @Get()
    gettask() {
        return this.tasksService.getAllTask()
    }

}
