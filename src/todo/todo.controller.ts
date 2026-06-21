import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { SearchTodoDto } from './dto/search-todo.dto';
import { PaginationDto } from './dto/pagination-todo.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  findAll(@Req() req, @Query() query: PaginationDto) {
    return this.todoService.findAll(req.user.sub, query);
  }

  @Get('search')
  search(@Req() req, @Query() query: SearchTodoDto) {
    return this.todoService.searchTodo(req.user.sub, query);
  }

  @Post()
  create(@Req() req, @Body() dto: CreateTodoDto) {
    return this.todoService.createTodo(req.user.sub, dto);
  }

  @Patch(':id')
  update(@Req() req, @Param('id') todoId: number, @Body() dto: UpdateTodoDto) {
    return this.todoService.updateTodo(req.user.sub, todoId, dto);
  }

  @Delete(':id')
  delete(@Req() req, @Param('id') todoId: number) {
    return this.todoService.delete(req.user.sub, todoId);
  }
}
