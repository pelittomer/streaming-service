import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../repository/category.repository';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { Category } from '../entities/category.entity';
import { CategoryUtilsService } from '../utils/category-utils.service';
import { CATEGORY_MESSAGES } from '../constants/error-messages.constant';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly categoryUtilsService: CategoryUtilsService,
  ) { }

  async addCategory(payload: CreateCategoryDto): Promise<string> {
    const { name } = payload

    await this.categoryUtilsService.checkIfCategoryExists(name)
    await this.categoryRepository.create({ name })

    return CATEGORY_MESSAGES.CATEGORY_CREATED_SUCCESS(name)
  }

  async getAllCategories(): Promise<Category[]> {
    return await this.categoryRepository.find()
  }
}