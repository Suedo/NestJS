import { Injectable, Get } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v1 as uuidv1 } from 'uuid';
import { CreateTaskDto } from './dto/create-task-dto';
import { FilterTaskDto } from './dto/filter-task-dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks() {
    return this.tasks;
  }

  getFilteredTasks(filter: FilterTaskDto): Task[] {
    const { status, search } = filter;

    let filteredTasks = this.tasks;

    if (status) {
      filteredTasks = filteredTasks.filter(task => task.status === status);
    }

    if (search) {
      filteredTasks = filteredTasks.filter(task => {
        task.title.includes(search) || task.description.includes(search);
      });
    }

    return filteredTasks;
  }

  getTaskById(id: string) {
    return this.tasks.find(task => task.id === id);
  }

  createTask(dto: CreateTaskDto): Task {
    const { title, description } = dto;

    const task: Task = {
      id: uuidv1(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  deleteTask(id: string) {
    this.tasks.forEach((task, index) => {
      if (task.id === id) this.tasks.splice(index, 1);
    });
    return this.tasks;
  }

  updateTaskStatus(taskId: string, newStatus: TaskStatus) {
    const task = this.getTaskById(taskId);
    task.status = newStatus;
    return task;
  }
}

// https://github.com/nestjs/nest/issues/4655
// private _tasks: string[] = [];
// get tasks(): string[] {
//   return this.tasks;
// }
