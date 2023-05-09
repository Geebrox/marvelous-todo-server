import { TodoController } from '@modules/todo/todo.controller';
import { TodoService } from '@modules/todo/todo.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
