import { Injectable, Get } from '@nestjs/common';

@Injectable()
export class TasksService {
  private _tasks: string[] = [];

  get tasks(): string[] {
    return this.tasks;
  }

  // private tasks: string[] = [];
  // getAllTasks() {
  //   return this.tasks;
  // }
}
