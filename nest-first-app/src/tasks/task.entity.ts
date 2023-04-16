/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

export enum TaskStatus {
    PENDING = 'PEDING',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE'
}

export class Task {
    id : number
    title : string
    description: string
    status: TaskStatus
}