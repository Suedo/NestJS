import { Injectable, Get } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid/v1';
import { CreateTaskDto } from './dto/create-task-dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks() {
    return this.tasks;
  }

  createTask(dto: CreateTaskDto): Task {
    const { title, description } = dto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }
}

// https://github.com/nestjs/nest/issues/4655
// private _tasks: string[] = [];
// get tasks(): string[] {
//   return this.tasks;
// }
