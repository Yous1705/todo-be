import { TodoPriority, TodoStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTodoDto {
  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsOptional()
  @IsEnum(TodoStatus)
  status?: TodoStatus;

  @IsEnum(TodoPriority)
  priority!: TodoPriority;

  @IsDateString()
  due_date!: string;

  @IsInt()
  @Type(() => Number)
  categoryId!: number;
}
