import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

describe('CategoryController', () => {
  let controller: CategoryController;
  let service: CategoryService;

  const mockService = {
    findAll: jest.fn(),
    createCategory: jest.fn(),
    updateCategory: jest.fn(),
    delete: jest.fn(),
    findTodosByCategory: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [{ provide: CategoryService, useValue: mockService }],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
    service = module.get<CategoryService>(CategoryService);

    jest.clearAllMocks();
  });

  it('should call categoryService.findAll', async () => {
    const categories = [
      {
        id: 1,
        name: 'test',
      },
      {
        id: 2,
        name: 'test2',
      },
    ];
    const result = {
      success: true,
      message: 'your category list',
      data: categories,
    };

    mockService.findAll.mockResolvedValue(result);
    const resultResponse = await controller.findAll();

    expect(service.findAll).toHaveBeenCalledTimes(1);
    expect(resultResponse).toEqual(result);
    expect(controller).toBeDefined();
  });

  it('should call categoryService.findTodosByCategory', async () => {
    const categoryId = 1;
    const category = {
      id: 1,
      name: 'test',
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
      message: `your ${category.name} todo list`,
      data: todos,
    };

    mockService.findTodosByCategory.mockResolvedValue(result);
    const resultResponse = await controller.findTodosByCategory(categoryId);

    expect(service.findTodosByCategory).toHaveBeenCalledWith(categoryId);
    expect(service.findTodosByCategory).toHaveBeenCalledTimes(1);
    expect(resultResponse).toEqual(result);
    expect(controller).toBeDefined();
  });

  it('should call categoryService.createCategory', async () => {
    const dto = {
      name: 'test',
      color: '#FF0000',
    };

    const result = {
      success: true,
      message: 'category created successfully',
    };

    mockService.createCategory.mockResolvedValue(result);

    const resultResponse = await controller.create(dto);

    expect(service.createCategory).toHaveBeenCalledWith(dto);
    expect(service.createCategory).toHaveBeenCalledTimes(1);
    expect(resultResponse).toEqual(result);
    expect(controller).toBeDefined();
  });

  it('should call categoryService.updateCategory', async () => {
    const categoryId = 1;

    const dto = {
      name: 'test',
      color: '#FF0000',
    };

    const category = {
      id: 1,
      name: 'test',
    };

    const result = {
      success: true,
      message: `category ${category.name} updated successfully`,
    };

    mockService.updateCategory.mockResolvedValue(result);

    const resultResponse = await controller.update(categoryId, dto);

    expect(service.updateCategory).toHaveBeenCalledWith(categoryId, dto);
    expect(service.updateCategory).toHaveBeenCalledTimes(1);
    expect(resultResponse).toEqual(result);
    expect(controller).toBeDefined();
  });

  it('should call categoryService.delete', async () => {
    const categoryId = 1;

    const category = {
      id: categoryId,
      name: 'test',
    };

    const result = {
      success: true,
      message: `category ${category.name} deleted successfully`,
    };

    mockService.delete.mockResolvedValue(result);

    const resultResponse = await controller.delete(categoryId);

    expect(service.delete).toHaveBeenCalledWith(categoryId);
    expect(service.delete).toHaveBeenCalledTimes(1);
    expect(resultResponse).toEqual(result);
    expect(controller).toBeDefined();
  });
});
