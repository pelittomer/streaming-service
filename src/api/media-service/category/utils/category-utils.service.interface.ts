export interface ICategoryUtilsService {
    checkIfCategoryExists(name: string): Promise<void>;
}