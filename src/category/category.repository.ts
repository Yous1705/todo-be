import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.category.findMany({
      select: {
        id: true,
        name: true,
        color: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  findOne(categoryId: number) {
    return this.prisma.category.findUnique({ where: { id: categoryId } });
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

  delete(categoryId: number) {
    return this.prisma.category.delete({ where: { id: categoryId } });
  }
}
