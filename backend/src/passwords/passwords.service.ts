import {
  BadRequestException,
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePasswordDto } from './dto/create-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Password } from './entities/password.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from '../auth/user.entity';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class PasswordsService {
  constructor(
    @InjectRepository(Password)
    private passwordRepository: Repository<Password>,
    @Inject(forwardRef(() => CategoriesService))
    private categoryService: CategoriesService,
  ) {}
  async create(
    createPasswordDto: CreatePasswordDto,
    user: User,
  ): Promise<Password> {
    let newPassword = new Password();
    if (createPasswordDto.categoryId) {
      newPassword.category = await this.categoryService.findOne(
        createPasswordDto.categoryId,
      );
    }
    newPassword.user = user;
    newPassword = { ...newPassword, ...createPasswordDto };

    const created = await this.passwordRepository.save(newPassword);
    delete created.user;

    return created;
  }

  async findAllFromUser(user: User): Promise<Password[]> {
    return await this.passwordRepository.findBy({
      user: { id: user.id },
    });
  }

  async findOne(id: number, user: User): Promise<Password> {
    const password = await this.passwordRepository.findOneBy({
      id: id,
      user: { id: user.id },
    });
    if (!password) {
      throw new NotFoundException('Password not found');
    }

    return password;
  }

  async findAllFromCategory(
    categoryID: number | null,
    user: User,
  ): Promise<Password[]> {
    if (categoryID && categoryID > 0) {
      const category = await this.categoryService.findOne(categoryID);
      if (!category) {
        throw new NotFoundException('Category not found');
      }

      if (
        !(await this.checkIfUserHasPassword(user.id, categoryID)) &&
        !(await this.categoryService.checkIfUserHasCategory(
          user.id,
          categoryID,
        ))
      ) {
        throw new ForbiddenException('This is not your category or password');
      }

      return await this.passwordRepository.findBy({
        category: { id: categoryID },
        user: { id: user.id },
      });
    } else {
      return await this.passwordRepository
        .findBy({
          user: { id: user.id },
        })
        .then((passwords) => {
          return passwords.filter((password) => {
            return !password.categoryId;
          });
        });
    }
  }

  async update(
    id: number,
    updatePasswordDto: UpdatePasswordDto,
    user: User,
  ): Promise<UpdateResult> {
    if (!(await this.checkIfPasswordExists(id))) {
      throw new NotFoundException('Password not found');
    }
    if (!(await this.checkIfUserHasPassword(user.id, id))) {
      throw new ForbiddenException('This is not your password');
    }

    return await this.passwordRepository.update(id, updatePasswordDto);
  }

  async remove(id: number, user: User): Promise<DeleteResult> {
    if (!(await this.checkIfPasswordExists(id))) {
      throw new NotFoundException('Password not found');
    }
    if (!(await this.checkIfUserHasPassword(user.id, id))) {
      throw new ForbiddenException('This is not your password');
    }

    return await this.passwordRepository.delete(id);
  }

  async updatePasswords(
    passwords: UpdatePasswordDto[],
    user: User,
  ): Promise<(UpdatePasswordDto & Password)[]> {
    for (const password of passwords) {
      if (!password.id) {
        throw new BadRequestException('Password ID is required');
      }
      if (!(await this.checkIfPasswordExists(password.id))) {
        throw new NotFoundException(
          `Password with id #${password.id} not found`,
        );
      }
      if (!(await this.checkIfUserHasPassword(user.id, password.id))) {
        throw new ForbiddenException(
          'This is not your password: ' + password.id,
        );
      }
    }

    return this.passwordRepository.save(passwords);
  }

  async checkIfPasswordExists(id: number): Promise<boolean> {
    const password = await this.passwordRepository.findOne({ where: { id } });

    return !!password;
  }

  async checkIfUserHasPassword(
    userID: number,
    passwordID: number,
  ): Promise<boolean> {
    const password = await this.passwordRepository.findOneBy({
      id: passwordID,
      user: { id: userID },
    });

    return !!password;
  }
}
