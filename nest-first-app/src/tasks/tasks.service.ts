/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import {Task, TaskStatus} from './task.entity'

@Injectable()
export class TasksService {

    private tasks : Task[] = [
        {
            id: 1,
            title: 'first task',
            description : 'some task',
            status: TaskStatus.DONE
        }
    ]
    

    getAllTask() {
        return this.tasks
    }
    createTask() {}
    updateTak() {}
    deleteTask() {}


}
