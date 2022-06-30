import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePasswordDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  website: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsOptional()
  categoryId: number;
}
