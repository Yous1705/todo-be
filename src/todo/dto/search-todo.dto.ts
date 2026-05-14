import { TodoPriority, TodoStatus } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class SearchTodoDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsEnum(TodoStatus)
  status?: TodoStatus;

  @IsOptional()
  @IsEnum(TodoPriority)
  priority?: TodoPriority;
}
