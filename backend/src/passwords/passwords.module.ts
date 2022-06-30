import { Module } from '@nestjs/common';
import { PasswordsService } from './passwords.service';
import { PasswordsController } from './passwords.controller';
import { Password } from './entities/password.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesService } from '../categories/categories.service';
import { Category } from '../categories/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Password, Category])],
  controllers: [PasswordsController],
  providers: [PasswordsService, CategoriesService],
})
export class PasswordsModule {}
