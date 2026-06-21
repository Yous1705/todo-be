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
  findAll(@Query() query: PaginationDto) {
    return this.todoService.findAll(query);
  }

  @Get('search')
  search(@Query() query: SearchTodoDto) {
    return this.todoService.searchTodo(query);
  }

  @Post()
  create(@Req() req, @Body() dto: CreateTodoDto) {
    return this.todoService.createTodo(req.user.sub, dto);
  }

  @Patch(':id')
  update(@Param('id') todoId: number, @Body() dto: UpdateTodoDto) {
    return this.todoService.updateTodo(todoId, dto);
  }

  @Delete(':id')
  delete(@Param('id') todoId: number) {
    return this.todoService.delete(todoId);
  }
}
