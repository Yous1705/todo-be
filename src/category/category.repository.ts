import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll(userId: number) {
    return this.prisma.category.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        name: true,
        color: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  findOne(userId: number, categoryId: number) {
    return this.prisma.category.findUnique({
      where: { userId, id: categoryId },
    });
  }

  findTodosByCategory(userId: number, categoryId: number) {
    return this.prisma.todo.findMany({ where: { userId, categoryId } });
  }

  create(data: Prisma.CategoryCreateInput) {
    return this.prisma.category.create({ data });
  }

  update(
    where: Prisma.CategoryWhereUniqueInput,
    data: Prisma.CategoryUpdateInput,
  ) {
    return this.prisma.category.update({ where, data });
  }

  delete(userId: number, categoryId: number) {
    return this.prisma.category.delete({ where: { userId, id: categoryId } });
  }
}
