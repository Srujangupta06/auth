import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './schema/todo.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from '@/user/user.service';
import { TodoRepository } from './todo.repository';
import { tokenPayload } from '@/shared/interface/interface';
import { FetchTodoQueryDto } from './dto/fetch-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name) private todoModel: Model<Todo>,
    private readonly userService: UserService,
    private readonly todoRepository: TodoRepository,
  ) {}
  async create(createTodoDto: CreateTodoDto, user: tokenPayload) {
    const exisitingUser = await this.userService.fetchUserById(user);
    const todo = await this.todoRepository.createTodo({
      ...createTodoDto,
      ownerId: exisitingUser?._id,
    });
    return {
      message: 'Todo Created Successfully',
      data: todo,
    };
  }

  async fetchTodosById(user: tokenPayload,query:FetchTodoQueryDto) {
    const exisitingUser = await this.userService.fetchUserById(user);
    const todoList = await this.todoRepository.fetchTodosById(
      exisitingUser?._id.toString(),
      query,
    );
    return {
      message: 'Todo List Fetched Successfully',
      data: todoList,
    };
  }

  async fetchTodoById(id: string, user: tokenPayload) {
    const todo = await this.todoRepository.fetchTodoById(id, user?.sub);
    if (!todo) {
      throw new NotFoundException('No Todo Found');
    }
    return {
      message: 'Todo Fetched Successfully',
      data: todo,
    };
  }

  async update(id: string, updateTodoDto: UpdateTodoDto, user: tokenPayload) {
    const existingTodo = await this.fetchTodoById(id, user);
    const updatedTodo = await this.todoRepository.updateTodoById(
      existingTodo,
      user?.sub,
      updateTodoDto,
    );
    return {
      message: 'Todo Updated Successfully',
      data: updatedTodo,
    };
  }

  async remove(id: string, user: tokenPayload) {
    const existingTodo = await this.fetchTodoById(id, user);
    await this.todoRepository.deleteTodoById(existingTodo,user?.sub);
    return {
      data: 'Todo Removed Successfully',
    };
  }
}
