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
  async fetchTodosById(userId: string, query: any) {
    const filterQuery: any = {
      ownerId: userId,
    };

    const sortQuery: any = {
      createdAt: 1,
    };

    if (query.status) {
      filterQuery.status = query.status;
    }

    if (query.priority) {
      filterQuery.priority = query.priority;
    }

    if (query.search) {
      filterQuery.title = {
        $regex: query.search,
        $options: 'i',
      };
    }

    if (query.sortBy) {
      sortQuery[query.sortBy] = query.sortOrder === 'asc' ? 1 : -1;
    }

    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;

    const todos = await this.todoModel
      .find(filterQuery)
      .sort(sortQuery)
      .skip(skip)
      .limit(limit)
      .select('-__v');

    const totalTodos = await this.todoModel.countDocuments(filterQuery);
    return {
      todos,
      pagination: {
        total: totalTodos,
        page,
        limit,
        totalPages: Math.ceil(totalTodos / limit),
      },
    };
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
