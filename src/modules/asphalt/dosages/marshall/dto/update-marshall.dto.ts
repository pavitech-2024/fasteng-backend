import { PartialType } from '@nestjs/mapped-types';
import { CreateMarshallDTO } from './create-marshal-dto';
import { IsDate, IsOptional } from 'class-validator';

export class UpdateMarshallDTO extends PartialType(CreateMarshallDTO) {
  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}