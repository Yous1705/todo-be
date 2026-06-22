import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

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
}
