import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { SearchTodoDto } from './dto/search-todo.dto';

@Injectable()
export class TodoRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.todo.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        priority: true,
        due_date: true,
        category: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  findOne(todoId: number) {
    return this.prisma.todo.findUnique({ where: { id: todoId } });
  }

  search(dto: SearchTodoDto) {
    const { title, status, priority } = dto;

    return this.prisma.todo.findMany({
      where: {
        AND: [
          title
            ? {
                OR: [
                  {
                    title: {
                      contains: title,
                      mode: 'insensitive',
                    },
                  },
                  {
                    description: {
                      contains: title,
                      mode: 'insensitive',
                    },
                  },
                ],
              }
            : {},
          status ? { status } : {},
          priority ? { priority } : {},
        ],
      },
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  create(data: Prisma.TodoCreateInput) {
    return this.prisma.todo.create({ data });
  }

  update(where: Prisma.TodoWhereUniqueInput, data: Prisma.TodoUpdateInput) {
    return this.prisma.todo.update({ where, data });
  }

  delete(todoId: number) {
    return this.prisma.todo.delete({ where: { id: todoId } });
  }
}
