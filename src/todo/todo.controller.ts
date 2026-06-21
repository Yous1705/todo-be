import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Req,
  UploadedFiles,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { SearchTodoDto } from './dto/search-todo.dto';
import { PaginationDto } from './dto/pagination-todo.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
@UseGuards(JwtAuthGuard)
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  findAll(@Req() req, @Query() query: PaginationDto) {
    return this.todoService.findAll(req.user.sub, query);
  }

  @Get('search')
  search(@Req() req, @Query() query: SearchTodoDto) {
    return this.todoService.searchTodo(req.user.sub, query);
  }

  @Post()
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
  create(
    @Req() req,
    @Body() dto: CreateTodoDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    console.log(dto);
    console.log(dto.due_date);
    console.log(typeof dto.due_date);
    return this.todoService.createTodo(req.user.sub, dto, files);
  }

  @Patch(':id')
  update(@Req() req, @Param('id') todoId: number, @Body() dto: UpdateTodoDto) {
    return this.todoService.updateTodo(req.user.sub, todoId, dto);
  }

  @Delete(':id')
  delete(@Req() req, @Param('id') todoId: number) {
    return this.todoService.delete(req.user.sub, todoId);
  }
}
