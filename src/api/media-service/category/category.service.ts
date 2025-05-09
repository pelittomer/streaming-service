import { BadRequestException, Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './schemas/category.schema';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository
  ) { }

  async addCategory(userInputs: CreateCategoryDto): Promise<string> {
    const { name } = userInputs

    const categoryExists = await this.categoryRepository.exists({ name })
    if (categoryExists) {
      throw new BadRequestException(`The category "${name}" already exists. Please choose a different name.`)
    }

    await this.categoryRepository.create({ name })

    return `Category "${name}" has been successfully created.`
  }

  async getAllCategories(): Promise<Category[]> {
    return await this.categoryRepository.find()
  }
  
}