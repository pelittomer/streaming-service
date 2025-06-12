import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Favorite } from "../entities/favorite.entity";
import { CreateFavoriteOptions, FindOneAndUpdateFavoriteOptions, IFavoriteRepository } from "./favorite.repository.interface";

@Injectable()
export class FavoriteRepository implements IFavoriteRepository {
    constructor(
        @InjectModel(Favorite.name) private favoriteModel: Model<Favorite>
    ) { }

    async create({ payload, session }: CreateFavoriteOptions): Promise<void> {
        await this.favoriteModel.create([payload], { session })
    }

    async findOne(queryFields: Partial<Favorite>): Promise<Favorite | null> {
        return await this.favoriteModel.findOne(queryFields).lean()
    }

    async findOneAndUpdate({ payload, queryFields }: FindOneAndUpdateFavoriteOptions): Promise<void> {
        await this.favoriteModel.findOneAndUpdate(queryFields, payload)
    }

    async findOneAndPopulate(queryFields: Partial<Favorite>): Promise<Favorite | null> {
        return await this.favoriteModel.findOne(queryFields)
            .populate('series movie')
            .lean()
    }
}