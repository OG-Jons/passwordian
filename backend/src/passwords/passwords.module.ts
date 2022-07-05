import { Module } from '@nestjs/common';
import { PasswordsService } from './passwords.service';
import { PasswordsController } from './passwords.controller';
import { Password } from './entities/password.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesService } from '../categories/categories.service';
import { Category } from '../categories/entities/category.entity';
import { AuthService } from '../auth/auth.service';
import { EncryptionService } from '../encryption/encryption.service';

@Module({
  imports: [TypeOrmModule.forFeature([Password, Category])],
  controllers: [PasswordsController],
  providers: [PasswordsService, CategoriesService, EncryptionService],
})
export class PasswordsModule {}
