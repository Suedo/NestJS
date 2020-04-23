import { Repository, EntityRepository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task-dto';
import { TaskStatus } from './task.model';
import { FilterTaskDto } from './dto/filter-task-dto';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTask(dto: CreateTaskDto): Promise<Task> {
    const { title, description } = dto;

    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN; // default business logic
    await task.save();

    return task;
  }

  async getTasks(dto: FilterTaskDto): Promise<Task[]> {
    const { status, search } = dto;
    const q = this.createQueryBuilder('task'); // name of table is argument

    // 'andWhere' adds on top of any existing queries, whereas a simple 'and' would overwrite other queries

    if (status) {
      q.andWhere('task.status = :status', { status });
    }

    if (search) {
      q.andWhere('task.title like :search OR task.description like :search', {
        search: `%${search}%`, // partial match
      });
    }

    // more info on querybuilder: https://github.com/typeorm/typeorm/blob/master/docs/select-query-builder.md

    const tasks = await q.getMany();
    return tasks;
  }
}
