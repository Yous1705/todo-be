import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly repo: CategoryRepository) {}

  async findAll() {
    const categories = await this.repo.findAll();

    if (!categories) {
      return {
        success: true,
        message: 'your category list doesnt exist yet',
      };
    }

    return {
      success: true,
      message: 'your category list',
      data: categories,
    };
  }

  async createCategory(dto: CreateCategoryDto) {
    await this.repo.create(dto);

    return {
      success: true,
      message: `category ${dto.name} created successfully`,
    };
  }

  async updateCategory(categoryId: number, dto: UpdateCategoryDto) {
    const category = await this.repo.findOne(categoryId);
    if (!category) throw new NotFoundException('category not found');

    await this.repo.update({ id: categoryId }, dto);

    return {
      success: true,
      message: `category ${category.name} updated successfully`,
    };
  }

  async delete(categoryId: number) {
    const Category = await this.repo.findOne(categoryId);
    if (!Category) throw new NotFoundException('category not found');

    await this.repo.delete(categoryId);

    return {
      success: true,
      message: `category ${Category.name} deleted successfully`,
    };
  }
}
