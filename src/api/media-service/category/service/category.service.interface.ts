import { CreateCategoryDto } from "../dto/create-category.dto";
import { Category } from "../entities/category.entity";

export interface ICategoryService {
    addCategory(payload: CreateCategoryDto): Promise<string>;
    getAllCategories(): Promise<Category[]>;
}