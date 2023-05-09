import { ROUTES } from '@common/constants';
import { CreateTodoDto } from '@modules/todo/dto/create-todo.dto';
import { UpdateTodoDto } from '@modules/todo/dto/update-todo.dto';
import { TodoService } from '@modules/todo/todo.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller(ROUTES.Todos)
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() data: CreateTodoDto) {
    return this.todoService.create(data);
  }

  @Get()
  findAll() {
    return this.todoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateTodoDto) {
    return this.todoService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(id);
  }

  @Delete()
  removeAll() {
    return this.todoService.removeAll();
  }
}
