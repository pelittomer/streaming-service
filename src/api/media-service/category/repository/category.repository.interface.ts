import { Category } from "../entities/category.entity";
import { CategoryDocument } from "../entities/types";

export type TExistsCategoryOptions = Pick<CategoryDocument, '_id'> | null;
export interface ICategoryRepository {
    exists(queryFields: Partial<Category>): Promise<TExistsCategoryOptions>;
    create(queryFields: Partial<Category>): Promise<void>;
    find(): Promise<Category[]>;
}