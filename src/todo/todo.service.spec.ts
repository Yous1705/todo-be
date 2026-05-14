import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { TodoRepository } from './todo.repository';
import { NotFoundException } from '@nestjs/common';

describe('TodoService', () => {
  let service: TodoService;
  let repo: TodoRepository;

  const mockRepo = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    search: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoService, { provide: TodoRepository, useValue: mockRepo }],
    }).compile();

    service = module.get<TodoService>(TodoService);
    repo = module.get<TodoRepository>(TodoRepository);

    jest.clearAllMocks();
  });

  it('should findAll Todo successfully', async () => {
    const dto = {
      page: 1,
      limit: 10,
    };

    const todos = {
      data: [
        {
          id: 1,
          title: 'test todo',
        },
        {
          id: 2,
          title: 'test todo2',
        },
      ],
      meta: {
        page: 1,
        limit: 10,
        total: 0,
      },
    };

    const result = {
      success: true,
      message: 'your todo list',
      data: todos,
    };

    mockRepo.findAll.mockResolvedValue(todos);

    const resultResponse = await service.findAll(dto);

    expect(repo.findAll).toHaveBeenCalledWith(dto.page, dto.limit);
    expect(repo.findAll).toHaveBeenCalledTimes(1);
    expect(resultResponse).toEqual(result);

    expect(service).toBeDefined();
  });

  it('should search Todo successfully', async () => {
    const dto = {
      title: 'test todo',
    };

    const todos = [
      {
        id: 1,
        title: 'test todo',
      },
      {
        id: 2,
        title: 'test todo2',
      },
    ];

    const result = {
      success: true,
      message: 'your todo list',
      data: todos,
    };

    mockRepo.search.mockResolvedValue(todos);

    const resultResponse = await service.searchTodo(dto);

    expect(repo.search).toHaveBeenCalledWith(dto);
    expect(repo.search).toHaveBeenCalledTimes(1);
    expect(resultResponse).toEqual(result);
  });

  it('should create Todo successfully', async () => {
    const dto = {
      title: 'test todo',
      description: 'test todo description',
      due_date: expect.any(Date),
    };

    const result = {
      success: true,
      message: `todo ${dto.title} created successfully`,
    };

    mockRepo.create.mockResolvedValue(dto);

    const resultResponse = await service.createTodo(dto);

    expect(repo.create).toHaveBeenCalledWith(dto);
    expect(repo.create).toHaveBeenCalledTimes(1);
    expect(resultResponse).toEqual(result);
  });

  it('should update Todo successfully', async () => {
    const todoId = 1;
    const dto = {
      title: 'test todo',
      description: 'test todo description',
      due_date: expect.any(Date),
    };

    const todo = {
      id: 1,
      title: 'test todo',
      description: 'test todo description',
    };

    const result = {
      success: true,
      message: `todo ${dto.title} updated successfully`,
    };

    mockRepo.findOne.mockResolvedValue(todo);

    const resultResponse = await service.updateTodo(todoId, dto);

    expect(repo.findOne).toHaveBeenCalledWith(todoId);
    expect(repo.findOne).toHaveBeenCalledTimes(1);

    expect(repo.update).toHaveBeenCalledWith({ id: todoId }, dto);
    expect(repo.update).toHaveBeenCalledTimes(1);

    expect(resultResponse).toEqual(result);
    expect(service).toBeDefined();
  });

  it('should throw NotFoundException when todo not found', async () => {
    const todoId = 1;
    const dto = {
      title: 'test todo',
      description: 'test todo description',
      due_date: expect.any(Date),
    };

    mockRepo.findOne.mockResolvedValue(null);

    await expect(service.updateTodo(todoId, dto)).rejects.toThrow(
      new NotFoundException('todo not found'),
    );

    expect(repo.findOne).toHaveBeenCalledWith(todoId);
    expect(repo.findOne).toHaveBeenCalledTimes(1);

    expect(mockRepo.update).not.toHaveBeenCalled();
    expect(mockRepo.update).toHaveBeenCalledTimes(0);

    expect(service).toBeDefined();
  });

  it('should delete Todo successfully', async () => {
    const todoId = 1;
    const todos = {
      id: todoId,
      title: 'test todo',
    };
    const result = {
      success: true,
      message: `todo ${todos.title} deleted successfully`,
    };

    mockRepo.findOne.mockResolvedValue(todos);

    const resultResponse = await service.delete(todoId);

    expect(repo.findOne).toHaveBeenCalledWith(todoId);
    expect(repo.findOne).toHaveBeenCalledTimes(1);

    expect(repo.delete).toHaveBeenCalledWith(todoId);
    expect(repo.delete).toHaveBeenCalledTimes(1);

    expect(resultResponse).toEqual(result);
    expect(service).toBeDefined();
  });

  it('should throw NotFoundException when todo not found for delete', async () => {
    const todoId = 1;

    mockRepo.findOne.mockResolvedValue(null);

    await expect(service.delete(todoId)).rejects.toThrow(
      new NotFoundException('todo not found'),
    );

    expect(repo.findOne).toHaveBeenCalledWith(todoId);
    expect(repo.findOne).toHaveBeenCalledTimes(1);

    expect(mockRepo.delete).not.toHaveBeenCalled();
    expect(mockRepo.delete).toHaveBeenCalledTimes(0);

    expect(service).toBeDefined();
  });
});
