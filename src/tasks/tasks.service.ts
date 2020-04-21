import { Injectable, Get } from '@nestjs/common';

@Injectable()
export class TasksService {
  // https://github.com/nestjs/nest/issues/4655
  // private _tasks: string[] = [];
  // get tasks(): string[] {
  //   return this.tasks;
  // }

  private tasks: string[] = [];
  getAllTasks() {
    return this.tasks;
  }
}
