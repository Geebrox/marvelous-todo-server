import { ROUTES } from '@common/constants';
import { CreateTodoDto } from '@modules/todo/dto/create-todo.dto';
import {
  FilterTodoDto,
  FilterWithoutPaginationTodoDto,
} from '@modules/todo/dto/filter-todo.dto';
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
  Query,
} from '@nestjs/common';

@Controller(ROUTES.Todos)
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() data: CreateTodoDto) {
    return this.todoService.create(data);
  }

  @Get()
  findMany(@Query() filter: FilterTodoDto) {
    return this.todoService.findMany(filter);
  }

  @Get(':id')
  findUnique(@Param('id') id: string) {
    return this.todoService.findUnique(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateTodoDto) {
    return this.todoService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.todoService.delete(id);
  }

  @Delete()
  deleteMany(@Query() where: FilterWithoutPaginationTodoDto) {
    return this.todoService.deleteMany(where);
  }
}
