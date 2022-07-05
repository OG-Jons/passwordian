import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { EncryptionService } from 'src/encryption/encryption.service';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private encryptionService: EncryptionService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const user = new User();
    user.username = username;
    user.masterPassword = await this.encryptionService.encryptWithSalt(
      password,
    );
    user.iv = randomBytes(16);
    user.key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;

    try {
      await user.save();
    } catch (e) {
      if (e.code === 'SQLITE_CONSTRAINT') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(
    authCredentials: AuthCredentialsDto | UpdatePasswordDto,
  ): Promise<string> {
    const { username, password } = authCredentials;
    const user = await this.userRepository.findOne({ where: { username } });

    if (user && (await user.validatePassword(password))) {
      return user.username;
    }
    return null;
  }

  async updateMasterPassword(
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<User> {
    const { username, password, newPassword } = updatePasswordDto;
    const user = await this.userRepository.findOne({ where: { username } });

    if (user && (await user.validatePassword(password))) {
      user.masterPassword = await this.encryptionService.encryptWithSalt(
        newPassword,
      );

      console.log('Updated: ', user.masterPassword);

      return await user.save();
    }
    return null;
  }
}
