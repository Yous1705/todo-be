import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

describe('TodoController', () => {
  let controller: TodoController;
  let service: TodoService;

  const mockService = {
    findAll: jest.fn(),
    searchTodo: jest.fn(),
    createTodo: jest.fn(),
    updateTodo: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [{ provide: TodoService, useValue: mockService }],
    }).compile();

    controller = module.get<TodoController>(TodoController);
    service = module.get<TodoService>(TodoService);

    jest.clearAllMocks();
  });

  it('should be call todoService.findAll', async () => {
    const dto = {
      page: 1,
      limit: 10,
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

    mockService.findAll.mockResolvedValue(result);
    const resultResponse = await controller.findAll(dto);
    expect(service.findAll).toHaveBeenCalled();
    expect(service.findAll).toHaveBeenCalledTimes(1);
    expect(resultResponse).toEqual(result);
    expect(controller).toBeDefined();
  });

  it('should call todoService.searchTodo', async () => {
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

    mockService.searchTodo.mockResolvedValue(result);
    const resultResponse = await controller.search(dto);

    expect(service.searchTodo).toHaveBeenCalledWith(dto);
    expect(service.searchTodo).toHaveBeenCalledTimes(1);
    expect(resultResponse).toEqual(result);
    expect(controller).toBeDefined();
  });

  it('should call todoService.createTodo', async () => {
    const dto = {
      title: 'test todo',
      description: 'test todo description',
      due_date: expect.any(Date),
    };
    const result = {
      success: true,
      message: `todo ${dto.title} created successfully`,
    };

    mockService.createTodo.mockResolvedValue(result);

    const resultResponse = await controller.create(dto);

    expect(service.createTodo).toHaveBeenCalledWith(dto);
    expect(service.createTodo).toHaveBeenCalledTimes(1);

    expect(resultResponse).toEqual(result);
    expect(controller).toBeDefined();
  });

  it('should call todoService.updateTodo', async () => {
    const todoId = 1;
    const dto = {
      title: 'test todo',
      description: 'test todo description',
      due_date: expect.any(Date),
    };
    const result = {
      success: true,
      message: `todo ${dto.title} updated successfully`,
    };

    mockService.updateTodo.mockResolvedValue(result);

    const resultResponse = await controller.update(todoId, dto);

    expect(service.updateTodo).toHaveBeenCalledWith(todoId, dto);
    expect(service.updateTodo).toHaveBeenCalledTimes(1);

    expect(resultResponse).toEqual(result);
    expect(controller).toBeDefined();
  });

  it('should call todoService.delete', async () => {
    const todoId = 1;
    const todos = {
      id: todoId,
      title: 'test todo',
    };
    const result = {
      success: true,
      message: `todo ${todos.title} deleted successfully`,
    };

    mockService.delete.mockResolvedValue(result);

    const resultResponse = await controller.delete(todoId);

    expect(service.delete).toHaveBeenCalledWith(todoId);
    expect(service.delete).toHaveBeenCalledTimes(1);

    expect(resultResponse).toEqual(result);
    expect(controller).toBeDefined();
  });
});
