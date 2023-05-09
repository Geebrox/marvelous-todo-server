import { PrismaService } from '@modules/prisma/prisma.service';
import { CreateTodoDto } from '@modules/todo/dto/create-todo.dto';
import {
  FilterTodoDto,
  FilterWithoutPaginationTodoDto,
} from '@modules/todo/dto/filter-todo.dto';
import { UpdateTodoDto } from '@modules/todo/dto/update-todo.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TodoService {
  constructor(private readonly prismaService: PrismaService) {}

  create(data: CreateTodoDto) {
    return this.prismaService.todo.create({ data });
  }

  async findMany(filter: FilterTodoDto) {
    const { take, skip, ...where } = filter;

    const todos = await this.prismaService.todo.findMany({
      where,
      take,
      skip,
      orderBy: { finishedAt: 'desc' },
    });

    return todos.sort((a, b) => a.title.localeCompare(b.title));
  }

  findUnique(id: string) {
    return this.prismaService.todo.findUnique({ where: { id } });
  }

  update(id: string, data: UpdateTodoDto) {
    return this.prismaService.todo.update({ where: { id }, data });
  }

  delete(id: string) {
    return this.prismaService.todo.delete({ where: { id } });
  }

  deleteMany(where: FilterWithoutPaginationTodoDto) {
    return this.prismaService.todo.deleteMany({ where });
  }
}
