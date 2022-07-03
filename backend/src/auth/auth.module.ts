import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { User } from './user.entity';
import { UserService } from './user.service';
import { EncryptionService } from '../encryption/encryption.service';
import { PasswordsService } from '../passwords/passwords.service';
import { Password } from '../passwords/entities/password.entity';
import { CategoriesService } from '../categories/categories.service';
import { Category } from '../categories/entities/category.entity';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'topSecret51',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    TypeOrmModule.forFeature([User, Password, Category]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    PasswordsService,
    CategoriesService,
    UserService,
    EncryptionService,
  ],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
