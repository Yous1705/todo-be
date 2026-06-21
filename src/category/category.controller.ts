import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
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
  findAll(@Req() req) {
    return this.categoryService.findAll(req.user.sub);
  }

  @Get(':id/todos')
  findTodosByCategory(@Req() req, @Param('id') categoryId: number) {
    return this.categoryService.findTodosByCategory(req.user.sub, categoryId);
  }

  @Post()
  create(@Req() req, @Body() dto: CreateCategoryDto) {
    return this.categoryService.createCategory(req.user.sub, dto);
  }

  @Patch(':id')
  update(
    @Req() req,
    @Param('id') categoryId: number,
    @Body() dto: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategory(req.user.sub, categoryId, dto);
  }

  @Delete(':id')
  delete(@Req() req, @Param('id') categoryId: number) {
    return this.categoryService.delete(req.user.sub, categoryId);
  }
}
