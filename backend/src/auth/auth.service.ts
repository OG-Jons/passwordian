import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { PasswordsService } from '../passwords/passwords.service';
import { User } from './user.entity';
import { createCipheriv, createDecipheriv, scrypt } from 'crypto';
import { promisify } from 'util';
import { Password } from '../passwords/entities/password.entity';
import { EncryptionService } from '../encryption/encryption.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private passwordService: PasswordsService,
    private encryptionService: EncryptionService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return await this.userService.signUp(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const username = await this.userService.validateUserPassword(
      authCredentialsDto,
    );

    if (!username) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { username };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  async updateMasterPassword(
    updatePasswordDto: UpdatePasswordDto,
    user?: User,
  ): Promise<{ accessToken: string }> {
    const username = await this.userService.validateUserPassword(
      updatePasswordDto,
    );

    if (!username) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const updated = await this.userService.updateMasterPassword(
      updatePasswordDto,
    );

    if (!updated) {
      throw new UnauthorizedException('Invalid credentials');
    }
    user.masterPassword = updated.masterPassword;
    const passwords = await this.passwordService.findAllFromUser(user);

    const unhashedPasswords = await Promise.all(
      passwords.map(async (password): Promise<Password> => {
        return {
          ...password,
          password: await this.encryptionService.decryptPassword(
            password.password,
            user.key,
            user.iv,
          ),
        };
      }),
    );

    user.key = (await promisify(scrypt)(
      updatePasswordDto.newPassword,
      'salt',
      32,
    )) as Buffer;

    try {
      await user.save();
    } catch (e) {
      throw new BadRequestException('Invalid request');
    }

    const hashPasswords = await Promise.all(
      unhashedPasswords.map(async (password): Promise<Password> => {
        return {
          ...password,
          password: await this.encryptionService.encryptPassword(
            password.password,
            user.key,
            user.iv,
          ),
        };
      }),
    );

    try {
      await this.passwordService.updatePasswords(hashPasswords);
    } catch (e) {
      throw new BadRequestException('Could not update passwords');
    }

    const payload: JwtPayload = { username };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
