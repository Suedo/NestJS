import { Controller, Get, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task-dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getAllTasks() {
    return this.taskService.getAllTasks();
  }

  @Post()
  createTask(@Body() dto: CreateTaskDto) {
    return this.taskService.createTask(dto);
  }
}
