import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from './schema/todo.schema';
import { UserModule } from '@/user/user.module';
import { TodoRepository } from './todo.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
    UserModule,
  ],
  controllers: [TodoController],
  providers: [TodoService,TodoRepository],
})
export class TodoModule {}
