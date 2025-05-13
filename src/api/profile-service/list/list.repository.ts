import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { List } from "./schemas/list.schema";
import { Model } from "mongoose";

@Injectable()
export class ListRepository {
    constructor(
        @InjectModel(List.name) private listModel: Model<List>
    ) { }

    async create(userInputs: Partial<List>): Promise<void> {
        await this.listModel.create(userInputs)
    }

}