import { Injectable, Get, NotFoundException, Inject } from '@nestjs/common';
import { TaskI, TaskStatus } from './task.model';
import { v1 as uuidv1 } from 'uuid';
import { CreateTaskDto } from './dto/create-task-dto';
import { FilterTaskDto } from './dto/filter-task-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';

@Injectable()
export class TaskPersistenceService {
  constructor(
    @InjectRepository(TaskRepository) private repository: TaskRepository,
  ) {}

  async getTaskById(id: number) {
    const found = await this.repository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Did not find a task with id: ${id}`);
    }

    return found;
  }
}
