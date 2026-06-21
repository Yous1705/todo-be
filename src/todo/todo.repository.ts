import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { SearchTodoDto } from './dto/search-todo.dto';
import { Prisma } from '@prisma/client';
@Injectable()
export class TodoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: number, page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [todos, total] = await Promise.all([
      this.prisma.todo.findMany({
        where: {
          userId,
        },
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          id: true,
          title: true,
          description: true,
          status: true,
          priority: true,
          due_date: true,
          category: {
            select: {
              id: true,
              name: true,
              color: true,
            },
          },
          images: true,
        },
      }),

      this.prisma.todo.count(),
    ]);

    return {
      data: todos,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page < Math.ceil(total / limit),
        hasPreviousPage: page > 1,
      },
    };
  }

  findOne(userId: number, todoId: number) {
    return this.prisma.todo.findUnique({ where: { userId, id: todoId } });
  }

  findCategory(userId: number) {
    return this.prisma.category.findFirst({ where: { userId } });
  }

  search(userId: number, dto: SearchTodoDto) {
    const { title, status, priority } = dto;

    return this.prisma.todo.findMany({
      where: {
        userId,
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
