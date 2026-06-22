import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRepository } from './task.repository';

@Injectable()
export class TaskService {
  constructor(private readonly repo: TaskRepository) {}

  create(todoId: number, dto: CreateTaskDto) {
    return this.repo.create({ ...dto, todo: { connect: { id: todoId } } });
  }
}
