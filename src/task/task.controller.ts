import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UploadedFiles,
  UseInterceptors,
  BadRequestException,
  Req,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
@UseGuards(JwtAuthGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post(':id')
  create(@Param('id') todoId: number, @Body() dto: CreateTaskDto) {
    return this.taskService.create(todoId, dto);
  }

  @Get(':id')
  findAll(@Param('id') todoId: number) {
    return this.taskService.findAll(todoId);
  }

  @Patch(':id')
  update(@Param('id') todoId: number, @Body() dto: UpdateTaskDto) {
    return this.taskService.update(todoId, dto);
  }

  @Patch(':id/start')
  startTask(@Req() req, @Param('id') taskId: number) {
    return this.taskService.startTask(req.user.sub, taskId);
  }

  @Patch(':id/complete')
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: memoryStorage(),
      limits: {
        fileSize: 40 * 1024 * 1024,
      },
      fileFilter(req, file, callback) {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
          return callback(new BadRequestException('Invalid file type'), false);
        }
        callback(null, true);
      },
    }),
  )
  completeTask(
    @Param('id') taskId: number,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.taskService.completeTask(taskId, files);
  }
}
