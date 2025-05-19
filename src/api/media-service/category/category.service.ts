import { BadRequestException, Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './schemas/category.schema';
import * as ErrorMessages from "./constants/error-messages.constant"

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository
  ) { }

  private async checkIfCategoryExists(name: string): Promise<void> {
    const categoryExists = await this.categoryRepository.exists({ name })
    if (categoryExists) {
      throw new BadRequestException(ErrorMessages.CATEGORY_EXISTS_ERROR)
    }
  }

  async addCategory(userInputs: CreateCategoryDto): Promise<string> {
    const { name } = userInputs

    await this.checkIfCategoryExists(name)
    await this.categoryRepository.create({ name })

    return ErrorMessages.CATEGORY_CREATED_SUCCESS(name)
  }

  async getAllCategories(): Promise<Category[]> {
    return await this.categoryRepository.find()
  }
}