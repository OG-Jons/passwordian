import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { PasswordsModule } from './passwords/passwords.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { EncryptionService } from './encryption/encryption.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    PasswordsModule,
    AuthModule,
    CategoriesModule,
  ],
  providers: [EncryptionService],
})
export class AppModule {}
