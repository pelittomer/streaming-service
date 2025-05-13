import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { List, ListDocument } from "./schemas/list.schema";
import { Model, Types } from "mongoose";

@Injectable()
export class ListRepository {
    constructor(
        @InjectModel(List.name) private listModel: Model<List>
    ) { }

    async create(userInputs: Partial<List>): Promise<void> {
        await this.listModel.create(userInputs)
    }

    async findOne(queryFields: Partial<Pick<ListDocument, '_id' | 'profile'>>): Promise<List | null> {
        return await this.listModel.findOne(queryFields).populate('movie series').lean()
    }

    async find(queryFields: Partial<List>): Promise<List[]> {
        return await this.listModel.find(queryFields).lean()
    }

    async exists(queryFields: Partial<List | Pick<ListDocument, '_id'>>): Promise<Pick<ListDocument, '_id'> | null> {
        return await this.listModel.exists(queryFields)
    }

    async findOneAndUpdate(queryFields: Partial<List | Pick<ListDocument, '_id'>>, userInputs: Partial<List>): Promise<void> {
        await this.listModel.findOneAndUpdate(queryFields, userInputs)
    }
}