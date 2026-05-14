import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { SearchTodoDto } from './dto/search-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  findAll() {
    return this.todoService.findAll();
  }

  @Get('search')
  search(@Query() query: SearchTodoDto) {
    return this.todoService.searchTodo(query);
  }

  @Post()
  create(@Body() dto: CreateTodoDto) {
    return this.todoService.createTodo(dto);
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
