import { Types } from "mongoose";
import { CreateFavoriteDto } from "../dto/favorite.dto";
import { Request } from "express";

export interface ValidateProfileOwnershipParams {
    userId: Types.ObjectId;
    profileId: Types.ObjectId;
}
export interface ValidateMediaExistenceParams {
    movie?: Types.ObjectId;
    series?: Types.ObjectId;
}
export interface ProcessFavoriteParams {
    payload: CreateFavoriteDto;
    req: Request;
    operation: '$addToSet' | '$pull';
    successMessageKey: string;
    notFoundInFavoritesMessageKey?: string;
}
export interface IFavoriteUtilsService {
    validateProfileOwnership(params: ValidateProfileOwnershipParams): Promise<void>;
    validateMediaExistence(params: ValidateMediaExistenceParams): Promise<void>;
    processFavorite(params: ProcessFavoriteParams): Promise<string | null>
}