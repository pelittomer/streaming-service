import { BadRequestException, Injectable } from "@nestjs/common";
import { CategoryRepository } from "../repository/category.repository";
import { ICategoryUtilsService } from "./category-utils.service.interface";
import { CATEGORY_MESSAGES } from "../constants/error-messages.constant";

@Injectable()
export class CategoryUtilsService implements ICategoryUtilsService {
    constructor(
        private readonly categoryRepository: CategoryRepository
    ) { }

    async checkIfCategoryExists(name: string): Promise<void> {
        const categoryExists = await this.categoryRepository.exists({ name })
        if (categoryExists) {
            throw new BadRequestException(CATEGORY_MESSAGES.CATEGORY_EXISTS_ERROR)
        }
    }
}