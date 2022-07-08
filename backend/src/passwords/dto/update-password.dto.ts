import { PartialType } from '@nestjs/mapped-types';
import { CreatePasswordDto } from './create-password.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdatePasswordDto extends PartialType(CreatePasswordDto) {
  @IsOptional()
  @IsNumber()
  id: number;
}
