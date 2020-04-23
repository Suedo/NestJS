import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task-dto';
import { TaskStatus } from './task.model';
import { FilterTaskDto } from './dto/filter-task-dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskPersistenceService } from './tasks.persistent.service';
import { Task } from './task.entity';

@Controller('api/v2/tasks')
export class TasksControllerV2 {
  constructor(private taskService: TaskPersistenceService) {}

  @Get(':id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.taskService.getTaskById(id);
  }
}
