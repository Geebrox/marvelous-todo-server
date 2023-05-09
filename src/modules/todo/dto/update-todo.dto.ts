import { CreateTodoDto } from '@modules/todo/dto/create-todo.dto';
import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsDate, ValidateIf } from 'class-validator';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @ValidateIf((dto: UpdateTodoDto) => typeof dto.finishedAt !== 'undefined')
  @IsBoolean()
  isFinished?: boolean;

  @ValidateIf((dto: UpdateTodoDto) => typeof dto.isFinished !== 'undefined')
  @IsDate()
  finishedAt?: Date;
}
