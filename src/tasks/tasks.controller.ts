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
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task-dto';
import { TaskStatus, TaskI } from './task.model';
import { FilterTaskDto } from './dto/filter-task-dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('api/v1/tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@Query(ValidationPipe) filterDto: FilterTaskDto) {
    if (Object.keys(filterDto).length) {
      console.log(`getTasks:: ${JSON.stringify(filterDto)}`);
      return this.taskService.getFilteredTasks(filterDto);
    } else {
      return this.taskService.tasks;
    }
  }

  @Get(':id')
  getTaskById(@Param('id') id: string) {
    console.log(`passed value of id: ${id}`);
    return this.taskService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() dto: CreateTaskDto) {
    return this.taskService.createTask(dto);
  }

  @Delete('delete/:id')
  deleteTask(@Param('id') id: string): TaskI[] {
    return this.taskService.deleteTask(id);
  }

  /**
   * Patch best practices:
   *
   * url format: PATCH http://ip:port/<resource>/<id of item to patch>/<what part of item to patch> . for us:
   * resource      : tasks
   * id            : provided
   * part to patch : status
   *
   * Also, provide the new patched value in the body
   *
   * @param id
   */
  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status', TaskStatusValidationPipe) newStatus: TaskStatus,
  ): TaskI {
    return this.taskService.updateTaskStatus(id, newStatus);
  }
}
