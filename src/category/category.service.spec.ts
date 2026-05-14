import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { CategoryRepository } from './category.repository';
import { NotFoundException } from '@nestjs/common';

describe('CategoryService', () => {
  let service: CategoryService;
  let repo: CategoryRepository;

  const mockRepo = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    findTodosByCategory: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        { provide: CategoryRepository, useValue: mockRepo },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    repo = module.get<CategoryRepository>(CategoryRepository);

    jest.clearAllMocks();
  });

  it('should find all categories', async () => {
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

    mockRepo.findAll.mockResolvedValue(categories);

    const resultResponse = await service.findAll();

    expect(repo.findAll).toHaveBeenCalledWith();
    expect(repo.findAll).toHaveBeenCalledTimes(1);
    expect(resultResponse).toEqual(result);
    expect(service).toBeDefined();
  });

  it('should find all todos by category', async () => {
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

    mockRepo.findOne.mockResolvedValue(category);
    mockRepo.findTodosByCategory.mockResolvedValue(todos);

    const resultResponse = await service.findTodosByCategory(categoryId);

    expect(repo.findOne).toHaveBeenCalledWith(categoryId);
    expect(repo.findOne).toHaveBeenCalledTimes(1);

    expect(repo.findTodosByCategory).toHaveBeenCalledWith(categoryId);
    expect(repo.findTodosByCategory).toHaveBeenCalledTimes(1);

    expect(resultResponse).toEqual(result);
    expect(service).toBeDefined();
  });

  it('should throw NotFoundException when category not found for find todos by category', async () => {
    const categoryId = 1;

    mockRepo.findOne.mockResolvedValue(null);

    await expect(service.findTodosByCategory(categoryId)).rejects.toThrow(
      new NotFoundException('category not found'),
    );

    expect(repo.findOne).toHaveBeenCalledWith(categoryId);
    expect(repo.findOne).toHaveBeenCalledTimes(1);

    expect(mockRepo.findTodosByCategory).not.toHaveBeenCalled();
    expect(mockRepo.findTodosByCategory).toHaveBeenCalledTimes(0);

    expect(service).toBeDefined();
  });

  it('should create category successfully', async () => {
    const dto = {
      name: 'test',
      color: '#FF0000',
    };

    const result = {
      success: true,
      message: `category ${dto.name} created successfully`,
    };
    mockRepo.create.mockResolvedValue(dto);

    const resultResponse = await service.createCategory(dto);

    expect(repo.create).toHaveBeenCalledWith(dto);
    expect(repo.create).toHaveBeenCalledTimes(1);

    expect(resultResponse).toEqual(result);
    expect(service).toBeDefined();
  });

  it('should update category successfully', async () => {
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

    mockRepo.findOne.mockResolvedValue(category);

    const resultResponse = await service.updateCategory(categoryId, dto);

    expect(repo.findOne).toHaveBeenCalledWith(categoryId);
    expect(repo.findOne).toHaveBeenCalledTimes(1);

    expect(repo.update).toHaveBeenCalledWith({ id: categoryId }, dto);
    expect(repo.update).toHaveBeenCalledTimes(1);

    expect(resultResponse).toEqual(result);
    expect(service).toBeDefined();
  });

  it('should throw NotFoundException when category not found for update', async () => {
    const categoryId = 1;
    const dto = {
      name: 'test',
      color: '#FF0000',
    };

    mockRepo.findOne.mockResolvedValue(null);

    await expect(service.updateCategory(categoryId, dto)).rejects.toThrow(
      new NotFoundException('category not found'),
    );

    expect(repo.findOne).toHaveBeenCalledWith(categoryId);
    expect(repo.findOne).toHaveBeenCalledTimes(1);

    expect(repo.update).not.toHaveBeenCalled();
    expect(repo.update).toHaveBeenCalledTimes(0);

    expect(service).toBeDefined();
  });

  it('should delete category successfully', async () => {
    const categoryId = 1;

    const category = {
      id: categoryId,
      name: 'test',
    };

    const result = {
      success: true,
      message: `category ${category.name} deleted successfully`,
    };

    mockRepo.findOne.mockResolvedValue(category);

    const resultResponse = await service.delete(categoryId);

    expect(repo.findOne).toHaveBeenCalledWith(categoryId);
    expect(repo.findOne).toHaveBeenCalledTimes(1);

    expect(repo.delete).toHaveBeenCalledWith(categoryId);
    expect(repo.delete).toHaveBeenCalledTimes(1);

    expect(resultResponse).toEqual(result);
    expect(service).toBeDefined();
  });

  it('should throw NotFoundException when category not found for delete', async () => {
    const categoryId = 1;

    mockRepo.findOne.mockResolvedValue(null);

    await expect(service.delete(categoryId)).rejects.toThrow(
      new NotFoundException('category not found'),
    );

    expect(repo.findOne).toHaveBeenCalledWith(categoryId);
    expect(repo.findOne).toHaveBeenCalledTimes(1);

    expect(mockRepo.delete).not.toHaveBeenCalled();
    expect(mockRepo.delete).toHaveBeenCalledTimes(0);

    expect(service).toBeDefined();
  });
});
