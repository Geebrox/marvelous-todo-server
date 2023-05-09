import { CreateTodoDto } from '@modules/todo/dto/create-todo.dto';
import { PartialType } from '@nestjs/mapped-types';
import { Transform, Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class FilterWithoutPaginationTodoDto extends PartialType(CreateTodoDto) {
  @IsOptional()
  @Type(() => String)
  @Transform(
    (params) => [true, 'enabled', 'true', 1, '1'].indexOf(params.value) > -1
  )
  isFinished?: boolean;
}

export class FilterTodoDto extends FilterWithoutPaginationTodoDto {
  @IsOptional()
  @IsNumber()
  take?: number;

  @IsOptional()
  @IsNumber()
  skip?: number;
}
