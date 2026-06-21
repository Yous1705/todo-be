import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly repo: CategoryRepository) {}

  async findAll(userId: number) {
    const categories = await this.repo.findAll(userId);

    return {
      success: true,
      message: 'your category list',
      data: categories,
    };
  }

  async findTodosByCategory(userId: number, categoryId: number) {
    const category = await this.repo.findOne(userId, categoryId);
    if (!category) throw new NotFoundException('category not found');

    const todos = await this.repo.findTodosByCategory(userId, categoryId);

    return {
      success: true,
      message: `your ${category.name} todo list`,
      data: todos,
    };
  }

  async createCategory(userId: number, dto: CreateCategoryDto) {
    const create = await this.repo.create({
      ...dto,
      user: { connect: { id: userId } },
    });

    return {
      success: true,
      message: `category ${create.name} created successfully`,
      data: create,
    };
  }

  async updateCategory(
    userId: number,
    categoryId: number,
    dto: UpdateCategoryDto,
  ) {
    const category = await this.repo.findOne(userId, categoryId);
    if (!category) throw new NotFoundException('category not found');

    await this.repo.update({ id: categoryId }, dto);

    return {
      success: true,
      message: `category ${category.name} updated successfully`,
    };
  }

  async delete(userId: number, categoryId: number) {
    const Category = await this.repo.findOne(userId, categoryId);
    if (!Category) throw new NotFoundException('category not found');

    await this.repo.delete(userId, categoryId);

    return {
      success: true,
      message: `category ${Category.name} deleted successfully`,
    };
  }
}
