import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { TaskStatus } from '../task.model';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses: string[] = [
    TaskStatus.DONE,
    TaskStatus.IN_PROGRESS,
    TaskStatus.OPEN,
  ];

  transform(value: string, metadata: ArgumentMetadata) {
    console.log(`Value: ${value} \nMetadata: ${JSON.stringify(metadata)}`);

    const valid = this.allowedStatuses.indexOf(value.toUpperCase()) >= 0;

    if (!valid) {
      throw new BadRequestException(`'${value}' is an invalid status`);
    }

    return value;
  }
}
