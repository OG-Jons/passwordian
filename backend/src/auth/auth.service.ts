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

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private passwordService: PasswordsService,
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
    console.log(updated);

    if (!updated) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwords = await this.passwordService.findAllFromUser(user);

    const unhashedPasswords = await Promise.all(
      passwords.map(async (password): Promise<Password> => {
        return {
          ...password,
          password: await this.decryptPassword(
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
          password: await this.encryptPassword(
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

  async encryptPassword(
    textToEncrypt: string,
    key: Buffer,
    iv: Buffer,
  ): Promise<string> {
    const cipher = createCipheriv('aes-256-ctr', key, iv);

    const encryptedText = Buffer.concat([
      cipher.update(textToEncrypt),
      cipher.final(),
    ]);
    return encryptedText.toString('base64');
  }

  decryptPassword = async (
    encryptedText: string,
    key: Buffer,
    iv: Buffer,
  ): Promise<string> => {
    // Convert encryptedText to buffer
    const encryptedTextBuffer = Buffer.from(encryptedText, 'base64');
    const decipher = createDecipheriv('aes-256-ctr', key, iv);
    const decryptedText = Buffer.concat([
      decipher.update(encryptedTextBuffer),
      decipher.final(),
    ]);
    return decryptedText.toString('base64');
  };
}
