import { PrismaService } from '@modules/prisma/prisma.service';
import { CreateTodoDto } from '@modules/todo/dto/create-todo.dto';
import { UpdateTodoDto } from '@modules/todo/dto/update-todo.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TodoService {
  constructor(private readonly prismaService: PrismaService) {}

  create(data: CreateTodoDto) {
    return this.prismaService.todo.create({ data });
  }

  findAll() {
    return this.prismaService.todo.findMany();
  }

  findOne(id: string) {
    return this.prismaService.todo.findUnique({ where: { id } });
  }

  update(id: string, data: UpdateTodoDto) {
    return this.prismaService.todo.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prismaService.todo.delete({ where: { id } });
  }

  removeAll() {
    return this.prismaService.todo.deleteMany();
  }
}
