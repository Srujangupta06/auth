import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from './schema/todo.schema';
import { Model } from 'mongoose';

@Injectable()
export class TodoRepository {
  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {}
  // CREATE TODO
  async createTodo(newTodo) {
    return await this.todoModel.create(newTodo);
  }

  // UPDATE TODO
  async updateTodoById(existingTodo, exisitingUser: string, newData) {
    const updateTodo = await this.todoModel.findByIdAndUpdate(
      { _id: existingTodo?.data?._id },
      { ownerId: exisitingUser },
      newData,
    );
    return updateTodo;
  }

  //  FETCH ALL TODOS
  async fetchTodosById(userId: string) {
    return await this.todoModel.find({ ownerId: userId }).select('-__v');
  }

  //  FETCH SINGLE TODO
  async fetchTodoById(todoId: string, userId: string) {
    return await this.todoModel
      .findOne({ _id: todoId, ownerId: userId })
      .select('-__v');
  }

  // DELETE TODO
  async deleteTodoById(existingTodo, userId: string) {
    await this.todoModel.findByIdAndDelete(
      { _id: existingTodo?.data?._id },
      { ownerId: userId },
    );
  }
}
