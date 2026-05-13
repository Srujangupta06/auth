import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { todoPriority, todoStatus } from '../enum/todo.enum';
import { TODO_CONSTRAINTS } from '../utils/todo.utils';

const minTodoTitleLength = TODO_CONSTRAINTS.TITLE.MIN_LENGTH;
const maxTodoTitleLength = TODO_CONSTRAINTS.TITLE.MAX_LENGTH;
const maxTodoDescriptionLength = TODO_CONSTRAINTS.DESCRIPTION.MAX_LENGTH;
export class CreateTodoDto {
  @IsString()
  @MinLength(minTodoTitleLength, {
    message: `Min chars :${minTodoTitleLength} is Required`,
  })
  @MaxLength(maxTodoTitleLength, {
    message: `Max chars :${maxTodoTitleLength} is Required`,
  })
  title: string;

  @IsString()
  @IsOptional()
  @MaxLength(maxTodoDescriptionLength, {
    message: `description Max Length ${maxTodoDescriptionLength} exceeded`,
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
}
