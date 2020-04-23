import { Injectable, Get, NotFoundException } from '@nestjs/common';
import { TaskI, TaskStatus } from './task.model';
import { v1 as uuidv1 } from 'uuid';
import { CreateTaskDto } from './dto/create-task-dto';
import { FilterTaskDto } from './dto/filter-task-dto';

@Injectable()
export class TasksService {
  private _tasks: TaskI[] = [];

  get tasks(): TaskI[] {
    return this._tasks;
  }

  getFilteredTasks(filter: FilterTaskDto): TaskI[] {
    console.log('in getFilteredTasks');
    const { status = '', search = '' } = filter;
    console.log(`${status}, ${search}`);

    const filteredTasks = this._tasks.filter(
      task => task.title.includes(search) || task.description.includes(search),
    );

    if (status.length > 0) {
      return filteredTasks.filter((task: TaskI) => task.status === status);
    }

    console.log(filteredTasks);

    return filteredTasks;
  }

  getTaskById(id: string) {
    const found = this.tasks.find(task => task.id === id);

    if (!found) {
      throw new NotFoundException(`Did not find a task with id: ${id}`);
    }

    return found;
  }

  createTask(dto: CreateTaskDto): TaskI {
    const { title, description } = dto;

    const task: TaskI = {
      id: uuidv1(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  deleteTask(id: string) {
    const found = this.getTaskById(id); // throws exception when task not present
    // this.tasks.forEach((task, index) => {
    //   if (task.id === found.id) this.tasks.splice(index, 1);
    // });
    console.log('Deleting Task:');
    console.log(found);
    this.tasks.splice(this.tasks.indexOf(found), 1);
    return this.tasks;
  }

  updateTaskStatus(taskId: string, newStatus: TaskStatus) {
    const task = this.getTaskById(taskId);
    task.status = newStatus;
    return task;
  }
}
