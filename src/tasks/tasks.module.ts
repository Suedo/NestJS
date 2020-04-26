import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { TasksControllerV2 } from './tasks.controller.v2';
import { TaskPersistenceService } from './tasks.persistent.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([TaskRepository]), AuthModule],
  controllers: [TasksController, TasksControllerV2],
  providers: [TasksService, TaskPersistenceService],
})
export class TasksModule {}
