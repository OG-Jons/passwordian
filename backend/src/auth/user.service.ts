import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EncryptionService } from 'src/encryption/encryption.service';

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

    console.log(user.masterPassword);

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
    authCredentials: AuthCredentialsDto,
  ): Promise<string> {
    const { username, password } = authCredentials;
    const user = await this.userRepository.findOne({ where: { username } });

    if (user && (await user.validatePassword(password))) {
      return user.username;
    }
    return null;
  }
}
