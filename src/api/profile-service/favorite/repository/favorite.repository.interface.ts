import { ClientSession } from "mongoose";
import { Favorite } from "../entities/favorite.entity";
import { FavoriteDocument } from "../entities/types";

export interface CreateFavoriteOptions {
    payload: Partial<Favorite>;
    session: ClientSession;
}
export interface FindOneAndUpdateFavoriteOptions {
    queryFields: Partial<Favorite | Pick<FavoriteDocument, '_id'>>;
    payload: Partial<Favorite>;
}
export interface IFavoriteRepository {
    create(params: CreateFavoriteOptions): Promise<void>;
    findOne(queryFields: Partial<Favorite>): Promise<Favorite | null>;
    findOneAndUpdate(params: FindOneAndUpdateFavoriteOptions): Promise<void>;
    findOneAndPopulate(queryFields: Partial<Favorite>): Promise<Favorite | null>;
}