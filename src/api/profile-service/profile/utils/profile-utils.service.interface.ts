import { Types } from "mongoose";
import { ProfileDocument } from "../entities/types";

export interface VerifyProfileOwnershipParams {
    profileId: Types.ObjectId;
    userId: Types.ObjectId;
}
export interface IProfileUtilsService {
    verifyProfileOwnership(params: VerifyProfileOwnershipParams): Promise<ProfileDocument>;
    checkProfileLimit(userId: Types.ObjectId): Promise<void>;
}