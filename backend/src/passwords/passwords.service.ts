import { Injectable } from '@nestjs/common';
import { CreatePasswordDto } from './dto/create-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Password } from './entities/password.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';

@Injectable()
export class PasswordsService {
  constructor(
    @InjectRepository(Password)
    private passwordRepository: Repository<Password>,
  ) {}

  create(createPasswordDto: CreatePasswordDto): Promise<Password> {
    return this.passwordRepository.save(createPasswordDto);
  }

  findAllFromUser(user: User): Promise<Password[]> {
    return this.passwordRepository.find({
      where: { username: user.username },
    });
  }

  findOne(id: number): Promise<Password> {
    return this.passwordRepository.findOne({ where: { id } });
  }

  update(
    id: number,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<UpdateResult> {
    return this.passwordRepository.update(id, updatePasswordDto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.passwordRepository.delete(id);
  }
}
