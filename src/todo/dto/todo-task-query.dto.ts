import { IsEnum, IsIn, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '@prisma/client';

export class TodoTaskQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsIn(['newest', 'oldest', 'alphabetical'])
  sort?: 'newest' | 'oldest' | 'alphabetical';
}
