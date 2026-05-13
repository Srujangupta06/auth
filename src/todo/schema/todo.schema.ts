import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { todoPriority, todoStatus } from '../enum/todo.enum';
import { TODO_CONSTRAINTS } from '../utils/todo.utils';
import { User } from '@/user/schema/user.schema';

export type TodoDocument = HydratedDocument<Todo>;

@Schema()
export class Todo {
  @Prop({
    isRequired: true,
    trim: true,
    minLength: TODO_CONSTRAINTS.TITLE.MIN_LENGTH,
    maxLength: TODO_CONSTRAINTS.TITLE.MAX_LENGTH,
  })
  title: string;
  @Prop({
    type: String,
    maxLength: TODO_CONSTRAINTS.DESCRIPTION.MAX_LENGTH,
  })
  description: string;
  @Prop({
    type: String,
    enum: todoStatus,
    default: todoStatus.TODO,
  })
  status: todoStatus;
  @Prop({
    type: String,
    enum: todoPriority,
    default: todoPriority.LOW,
  })
  priority: todoPriority;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  ownerId: Types.ObjectId;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
