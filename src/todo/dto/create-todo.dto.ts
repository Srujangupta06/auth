import {
    IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { todoPriority, todoStatus } from '../enum/todo.enum';

const MIN_LENGTH = 8;
const MAX_DESC_LENGTH = 50;

export class CreateTodoDto {

  @IsString()
  @MinLength(MIN_LENGTH, {
    message: `Min chars :${MIN_LENGTH} is Required`,
  })
  title: string;

  @IsString()
  @IsOptional()
  @MaxLength(50, {
    message: `description Max Length ${MAX_DESC_LENGTH} exceeded`,
  })
  description: string;

  @IsEnum(todoStatus, {
    message: 'Invalid Todo Status',
  })
  status: todoStatus = todoStatus.TODO;

  @IsEnum(todoPriority, {
    message: 'Invalid Todo Priority',
  })
  priority: todoPriority = todoPriority.HIGH;

  @IsDateString()
  estimationDate: string;
}
