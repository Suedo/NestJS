import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task-dto';
import { TaskStatus, Task } from './task.model';
import { FilterTaskDto } from './dto/filter-task-dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: FilterTaskDto) {
    if (Object.keys(filterDto).length) {
      console.log(`getTasks:: ${JSON.stringify(filterDto)}`);
      return this.taskService.getFilteredTasks(filterDto);
    } else {
      return this.taskService.getAllTasks();
    }
  }

  @Get(':id')
  getTaskById(@Param('id') id: string) {
    console.log(`passed value of id: ${id}`);
    return this.taskService.getTaskById(id);
  }

  @Post()
  createTask(@Body() dto: CreateTaskDto) {
    return this.taskService.createTask(dto);
  }

  @Delete('delete/:id')
  deleteTask(@Param('id') id: string): Task[] {
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
    @Body('status') newStatus: TaskStatus,
  ): Task {
    return this.taskService.updateTaskStatus(id, newStatus);
  }
}
