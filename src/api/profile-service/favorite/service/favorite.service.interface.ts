import { Request } from "express";
import { CreateFavoriteDto } from "../dto/favorite.dto";
import { Favorite } from "../entities/favorite.entity";
import { GetFavoriteDto } from "../dto/get-favorite.dto";

export interface AddFavoriteParams {
    payload: CreateFavoriteDto;
    req: Request;
}
export interface RemoveFavoriteByIdParams {
    payload: CreateFavoriteDto;
    req: Request;
}
export interface RemoveAllFavoritesParams {
    req: Request;
    queryFields: GetFavoriteDto;
}
export interface GetUserFavoritesParams {
    req: Request;
    queryFields: GetFavoriteDto;
}
export interface IFavoriteService {
    addFavorite(params: AddFavoriteParams);
    removeFavoriteById(params: RemoveFavoriteByIdParams);
    removeAllFavorites(params: RemoveAllFavoritesParams): Promise<string>;
    getUserFavorites(params: GetUserFavoritesParams): Promise<Favorite | null>;
}