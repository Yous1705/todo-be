import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  findTodo(userId: number, todoId: number) {
    return this.prisma.todo.findUnique({ where: { userId, id: todoId } });
  }

  findById(userId: number, taskId: number) {
    return this.prisma.task.findUnique({
      where: {
        userId,
        id: taskId,
      },
    });
  }

  startTask(userId: number, taskId: number) {
    return this.prisma.task.update({
      where: {
        userId,
        id: taskId,
      },

      data: {
        isRunning: true,
        currentStartedAt: new Date(),
      },
    });
  }

  create(data: Prisma.TaskCreateInput) {
    return this.prisma.task.create({ data });
  }

  findAll(todoId: number) {
    return this.prisma.task.findMany({ where: { todoId } });
  }

  update(where: Prisma.TaskWhereUniqueInput, data: Prisma.TaskUpdateInput) {
    return this.prisma.task.update({ where, data });
  }

  completeTask(data: {
    taskId: number;
    taskImages?: {
      create: { url: string }[];
    };
  }) {
    return this.prisma.task.update({
      where: { id: data.taskId },
      data: { status: 'COMPLETED', taskImages: data.taskImages },
    });
  }
}
