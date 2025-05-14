import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Favorite, FavoriteDocument } from "./schemas/favorite.schema";
import { ClientSession, Model } from "mongoose";

@Injectable()
export class FavoriteRepository {
    constructor(
        @InjectModel(Favorite.name) private favoriteModel: Model<Favorite>
    ) { }

    async create(userInputs: Partial<Favorite>, session: ClientSession): Promise<void> {
        await this.favoriteModel.create([userInputs], { session })
    }

    async findOneAndUpdate(queryFields: Partial<Favorite | Pick<FavoriteDocument, '_id'>>, userInputs: Partial<Favorite>): Promise<void> {
        await this.favoriteModel.findOneAndUpdate(queryFields, userInputs)
    }
}