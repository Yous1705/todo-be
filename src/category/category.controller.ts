import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id/todos')
  findTodosByCategory(@Param('id') categoryId: number) {
    return this.categoryService.findTodosByCategory(categoryId);
  }

  @Post()
  create(@Body() dto: CreateCategoryDto) {
    return this.categoryService.createCategory(dto);
  }

  @Patch(':id')
  update(@Param('id') categoryId: number, @Body() dto: UpdateCategoryDto) {
    return this.categoryService.updateCategory(categoryId, dto);
  }

  @Delete(':id')
  delete(@Param('id') categoryId: number) {
    return this.categoryService.delete(categoryId);
  }
}
