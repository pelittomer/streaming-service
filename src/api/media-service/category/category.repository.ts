import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Category, CategoryDocument } from "./schemas/category.schema";
import { Model } from "mongoose";

@Injectable()
export class CategoryRepository {
    constructor(
        @InjectModel(Category.name) private categoryModel: Model<Category>
    ) { }

    async exists(
        queryFields: Partial<Category>
    ): Promise<Pick<CategoryDocument, '_id'> | null> {
        return await this.categoryModel.exists(queryFields)
    }

    async create(queryFields: Partial<Category>): Promise<void> {
        await this.categoryModel.create(queryFields)
    }

    async find(): Promise<Category[]> {
        return await this.categoryModel.find()
    }
}