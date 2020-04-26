import { Injectable, Get, NotFoundException, Inject } from '@nestjs/common';
import { TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task-dto';
import { FilterTaskDto } from './dto/filter-task-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TaskPersistenceService {
  constructor(
    @InjectRepository(TaskRepository) private repository: TaskRepository,
  ) {}

  async getTasks(filterTaskDto: FilterTaskDto, user: User): Promise<Task[]> {
    return this.repository.getTasks(filterTaskDto, user);
  }

  async getTaskById(id: number, user: User) {
    const found = await this.repository.findOne({
      where: {
        id, // and
        userId: user.id,
      },
    });
    if (!found) {
      throw new NotFoundException(`Did not find a task with id: ${id}`);
    }
    return found;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.repository.createTask(createTaskDto, user);
  }

  async deleteTask(id: number, user: User): Promise<void> {
    const result = await this.repository.delete({
      id, // and
      userId: user.id,
    });
    console.log(`Deleted Task: ${JSON.stringify(result)}`);

    if (result.affected === 0) {
      throw new NotFoundException(`Did not find a task with id: ${id}`);
    }
  }

  async updateStatus(id: number, status: TaskStatus, user): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await task.save();
    return task;
  }
}
