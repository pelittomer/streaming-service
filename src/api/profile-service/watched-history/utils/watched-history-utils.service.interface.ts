import { Types } from "mongoose";
import { WatchedHistoryQuery } from "../dto/watched-history-query.dto";
import { Request } from "express";

export interface ValidateProfileOwnershipParams {
    profileId: Types.ObjectId,
    userId: Types.ObjectId
}
export interface GetProfileObjectIdAndValidateParams {
    req: Request;
    profileIdFromQuery: WatchedHistoryQuery;
}
export interface IWatchedHistoryUtilsService {
    validateProfileOwnership(params: ValidateProfileOwnershipParams): Promise<void>;
    getProfileObjectIdAndValidate(params: GetProfileObjectIdAndValidateParams): Promise<Types.ObjectId>;
}