import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoRepository } from './todo.repository';
import { SearchTodoDto } from './dto/search-todo.dto';
import { PaginationDto } from './dto/pagination-todo.dto';

@Injectable()
export class TodoService {
  constructor(private readonly repo: TodoRepository) {}

  async findAll(userId: number, dto: PaginationDto) {
    const page = dto.page ?? 1;
    const limit = dto.limit ?? 10;

    const todos = await this.repo.findAll(userId, page, limit);

    return {
      success: true,
      message: 'your todo list',
      data: todos,
    };
  }

  async searchTodo(userId: number, dto: SearchTodoDto) {
    const todos = await this.repo.search(userId, dto);

    return {
      success: true,
      message: 'your todo list',
      data: todos,
    };
  }

  async createTodo(userId: number, dto: CreateTodoDto) {
    const create = await this.repo.create({
      title: dto.title,
      description: dto.description,
      status: dto.status,
      priority: dto.priority,
      due_date: dto.due_date,

      category: {
        connect: {
          id: dto.categoryId,
        },
      },

      user: {
        connect: {
          id: userId,
        },
      },
    });

    return {
      success: true,
      message: `todo ${dto.title} created successfully`,
      data: create,
    };
  }

  async updateTodo(userId: number, todoId: number, dto: UpdateTodoDto) {
    const todos = await this.repo.findOne(userId, todoId);
    if (!todos) throw new NotFoundException('todo not found');

    await this.repo.update({ id: todoId }, dto);

    return {
      success: true,
      message: `todo ${todos.title} updated successfully`,
    };
  }

  async delete(userId: number, todoId: number) {
    const todos = await this.repo.findOne(userId, todoId);
    if (!todos) throw new NotFoundException('todo not found');

    await this.repo.delete(todoId);

    return {
      success: true,
      message: `todo ${todos.title} deleted successfully`,
    };
  }
}
