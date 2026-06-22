import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  findTodo(userId: number, todoId: number) {
    return this.prisma.todo.findUnique({ where: { userId, id: todoId } });
  }

  create(data: Prisma.TaskCreateInput) {
    return this.prisma.task.create({ data });
  }
}
