import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Category } from "../entities/category.entity";
import { Model } from "mongoose";
import { TExistsCategoryOptions } from "./category.repository.interface";

@Injectable()
export class CategoryRepository {
    constructor(
        @InjectModel(Category.name) private categoryModel: Model<Category>
    ) { }

    async exists(queryFields: Partial<Category>): Promise<TExistsCategoryOptions> {
        return await this.categoryModel.exists(queryFields)
    }

    async create(queryFields: Partial<Category>): Promise<void> {
        await this.categoryModel.create(queryFields)
    }

    async find(): Promise<Category[]> {
        return await this.categoryModel.find()
    }
}