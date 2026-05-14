import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoRepository } from './todo.repository';
import { SearchTodoDto } from './dto/search-todo.dto';
import { PaginationDto } from './dto/pagination-todo.dto';

@Injectable()
export class TodoService {
  constructor(private readonly repo: TodoRepository) {}

  async findAll(dto: PaginationDto) {
    const page = dto.page ?? 1;
    const limit = dto.limit ?? 10;

    const todos = await this.repo.findAll(page, limit);

    if (!todos) {
      return {
        success: true,
        message: 'your todo list doesnt exist yet',
      };
    }

    return {
      success: true,
      message: 'your todo list',
      data: todos,
    };
  }

  async searchTodo(dto: SearchTodoDto) {
    const todos = await this.repo.search(dto);

    if (!todos) {
      return {
        success: true,
        message: 'your todo list doesnt exist yet',
      };
    }

    return {
      success: true,
      message: 'your todo list',
      data: todos,
    };
  }

  async createTodo(dto: CreateTodoDto) {
    await this.repo.create(dto);

    return {
      success: true,
      message: `todo ${dto.title} created successfully`,
    };
  }

  async updateTodo(todoId: number, dto: UpdateTodoDto) {
    const todos = await this.repo.findOne(todoId);
    if (!todos) throw new NotFoundException('todo not found');

    await this.repo.update({ id: todoId }, dto);

    return {
      success: true,
      message: `todo ${todos.title} updated successfully`,
    };
  }

  async delete(todoId: number) {
    const todos = await this.repo.findOne(todoId);
    if (!todos) throw new NotFoundException('todo not found');

    await this.repo.delete(todoId);

    return {
      success: true,
      message: `todo ${todos.title} deleted successfully`,
    };
  }
}
