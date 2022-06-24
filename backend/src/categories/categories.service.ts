import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Category } from './entities/category.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  create(createCategoryDto: CreateCategoryDto, user: User): Promise<Category> {
    return this.categoryRepository.save(
      new Category(createCategoryDto.name, user),
    );
  }

  findAllOfUser(userID: number): Promise<Category[]> {
    return this.categoryRepository.find({
      where: {
        user: {
          id: userID,
        },
      },
    });
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({ id });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
    user: User,
  ): Promise<UpdateResult> {
    if (!(await this.checkIfCategoryExists(id))) {
      throw new NotFoundException('Category not found');
    }
    if (await this.checkIfUserHasCategory(user.id, id)) {
      throw new ForbiddenException('This is not your category');
    }

    return await this.categoryRepository.update(id, updateCategoryDto);
  }

  async remove(id: number, user: User): Promise<DeleteResult> {
    if (!(await this.checkIfCategoryExists(id))) {
      throw new NotFoundException('Category not found');
    }
    if (await this.checkIfUserHasCategory(user.id, id)) {
      throw new ForbiddenException('This is not your category');
    }
    return await this.categoryRepository.delete(id);
  }

  async checkIfCategoryExists(id: number): Promise<boolean> {
    const category = await this.categoryRepository.findOneBy({ id });

    return !!category;
  }

  async checkIfUserHasCategory(
    userID: number,
    categoryID: number,
  ): Promise<boolean> {
    const category = await this.categoryRepository.findOneBy({
      id: categoryID,
      user: { id: userID },
    });

    return !!!category;
  }
}
