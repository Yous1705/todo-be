import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRepository } from './task.repository';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class TaskService {
  constructor(
    private readonly repo: TaskRepository,
    private readonly cloudinary: CloudinaryService,
  ) {}

  create(todoId: number, dto: CreateTaskDto) {
    return this.repo.create({ ...dto, todo: { connect: { id: todoId } } });
  }

  findAll(todoId: number) {
    return this.repo.findAll(todoId);
  }

  async update(todoId: number, dto: UpdateTaskDto) {
    const result = await this.repo.update({ id: todoId }, dto);

    return {
      success: true,
      message: `task ${result.title} updated successfully`,
      data: result,
    };
  }

  async startTask(taskId: number) {
    const task = await this.repo.findById(taskId);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (task.status === 'COMPLETED') {
      throw new BadRequestException('Task already completed');
    }

    if (task.isRunning) {
      throw new BadRequestException('Task already running');
    }

    const result = await this.repo.startTask(taskId);

    return {
      success: true,
      message: `${result.title} started`,
      data: result,
    };
  }

  async pauseTask(taskId: number) {
    const task = await this.repo.findById(taskId);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (!task.isRunning) {
      throw new BadRequestException('Task is not running');
    }

    const now = new Date();

    const duration = Math.floor(
      (now.getTime() - task.currentStartedAt!.getTime()) / 1000,
    );

    const result = await this.repo.pauseTask(
      taskId,
      task.totalDuration + duration,
    );

    return {
      success: true,
      message: `${result.title} paused`,
      data: result,
    };
  }

  async completeTask(taskId: number, files: Express.Multer.File[]) {
    const imageUrls = files?.length
      ? await this.cloudinary.uploadMultiple(files)
      : [];

    const result = await this.repo.completeTask({
      taskId,
      taskImages: imageUrls.length
        ? {
            create: imageUrls.map((url) => ({ url })),
          }
        : undefined,
    });
    return {
      success: true,
      message: `task ${result.title} completed successfully`,
      data: result,
    };
  }
}
