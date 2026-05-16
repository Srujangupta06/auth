import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  HttpCode,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { AuthGuard } from '@/auth/guard/auth.guard';
import { CurrentUser } from '@/shared/decorator/current-user.decorator';
import { tokenPayload } from '@/shared/interface/interface';

@UseGuards(AuthGuard)
@Controller({
  path: 'todos',
  version: '1',
})
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post('create')
  create(
    @Body() createTodoDto: CreateTodoDto,
    @CurrentUser() user: tokenPayload,
  ) {
    return this.todoService.create(createTodoDto, user);
  }

  @Get()
  findAll(@CurrentUser() user: tokenPayload) {
    return this.todoService.fetchTodosById(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: tokenPayload) {
    return this.todoService.fetchTodoById(id, user);
  }

  @Patch('edit/:id')
  update(
    @CurrentUser() user: tokenPayload,
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    return this.todoService.update(id, updateTodoDto, user);
  }

  @HttpCode(204)
  @Delete('remove/:id')
  remove(@CurrentUser() user: tokenPayload, @Param('id') id: string) {
    return this.todoService.remove(id, user);
  }
}
