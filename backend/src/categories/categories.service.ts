import { Injectable, NotFoundException } from '@nestjs/common';
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
    const newCategory = new Category(createCategoryDto.name, user);

    return this.categoryRepository.save(newCategory);
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
  ): Promise<UpdateResult> {
    const updated = await this.categoryRepository.update(id, updateCategoryDto);

    if (updated.affected === 0) {
      throw new NotFoundException('Category not found');
    }

    return updated;
  }

  async remove(id: number): Promise<DeleteResult> {
    const removed = await this.categoryRepository.delete(id);

    if (removed.affected === 0) {
      throw new NotFoundException('Category not found');
    }

    return this.categoryRepository.delete(id);
  }
}
