import { IsEnum, IsIn, IsInt, IsNumberString, IsOptional, IsString, Min } from 'class-validator';
import { todoPriority, todoStatus } from '../enum/todo.enum';
import { Transform } from 'class-transformer';

export class FetchTodoQueryDto {
  @IsOptional()
  @IsEnum(todoStatus)
  status?: todoStatus;

  @IsOptional()
  @IsEnum(todoPriority)
  priority?: todoPriority;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsIn(['createdAt', 'updatedAt', 'priority', 'status', 'title'])
  sortBy?: string;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc';

  @IsOptional()
  @IsInt()
  @Min(1)
  page: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  limit: number;
}
