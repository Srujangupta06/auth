import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './schema/todo.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from '@/user/user.service';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name) private todoModel: Model<Todo>,
    private readonly userService: UserService,
  ) {}
  async create(createTodoDto: CreateTodoDto, user: any) {
    const exisitingUser = await this.userService.fetchUserByEmail(user.sub);
    const todo = await this.todoModel.create({
      ...createTodoDto,
      ownerId: exisitingUser?._id,
    });
    return {
      message: 'Todo Created Successfully',
      data: todo?._id,
    };
  }

  async findAll(user: any) {
    const exisitingUser = await this.userService.fetchUserByEmail(user?.sub);
    const todoList = await this.todoModel
      .find({ ownerId: exisitingUser?._id })
      .select('-__v')
      .where({});
    return {
      message: 'Todo List Found Successfully',
      data: todoList,
    };
  }

  async findOne(id: string) {
    const todo = await this.todoModel.findOne({ _id: id }).select('-__v');
    if (!todo) {
      throw new NotFoundException('No Todo Found');
    }
    return {
      data: todo,
      message: 'Todo Found Successfully',
    };
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo`;
  }

  async remove(id: string, user: any) {
    const exisitingUser = await this.userService.fetchUserByEmail(user?.sub);
    const existingTodo = await this.findOne(id);
    await this.todoModel
      .findOneAndDelete({
        _id: existingTodo?.data?._id,
        ownerId: exisitingUser?._id,
      })
    return {
      data: 'Todo Removed Successfully',
    };
  }
}
