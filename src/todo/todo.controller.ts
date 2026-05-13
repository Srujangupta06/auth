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

@UseGuards(AuthGuard)
@Controller({
  path: 'todos',
  version: '1',
})
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post('create')
  create(@Body() createTodoDto: CreateTodoDto, @Req() req) {
    return this.todoService.create(createTodoDto, req.user);
  }

  @Get()
  findAll(@Req() req) {
    return this.todoService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(id);
  }

  @Patch('edit/:id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(+id, updateTodoDto);
  }

  @HttpCode(204)
  @Delete('remove/:id')
  remove(@Req() req, @Param('id') id: string) {
    return this.todoService.remove(id, req.user);
  }
}
