import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Delete,
  Patch,
  Query,
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

  @Get()
  getTasks(@Query(ValidationPipe) dto: FilterTaskDto): Promise<Task[]> {
    return this.taskService.getTasks(dto);
  }

  @Get(':id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() dto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(dto);
  }

  @Delete(':id')
  deleteTaskById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.taskService.deleteTask(id);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ): Promise<Task> {
    return this.taskService.updateStatus(id, status);
  }
}
