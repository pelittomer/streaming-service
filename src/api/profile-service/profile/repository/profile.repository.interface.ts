import { Types } from "mongoose";
import { Profile } from "../entities/profile.entity";
import { ProfileDocument } from "../entities/types";
import { UpdateProfileDto } from "../dto/update-profile.dto";

export interface CreateProfileOptions {
    queryFields: Partial<Profile>;
    uploadedImage: Express.Multer.File;
}
export type FindOneProfileOptions = Partial<Profile | Pick<ProfileDocument, '_id'>>;
export interface FindOneAndUpdateProfileOptions {
    queryFields: Partial<Profile | Pick<ProfileDocument, '_id'>>;
    payload: UpdateProfileDto;
    uploadedImage: Express.Multer.File;
    avatar?: Types.ObjectId;
}
export type ExistsProfileOptions = Partial<Profile | Pick<ProfileDocument, '_id'>>;
export type TExistsProfile = Pick<ProfileDocument, '_id'> | null
export interface IProfileRepository {
    countDocument(queryFields: Partial<Profile>): Promise<number>;
    create(params: CreateProfileOptions): Promise<void>;
    findOne(queryFields: FindOneProfileOptions): Promise<ProfileDocument | null>;
    find(queryFields: Partial<Profile>): Promise<Profile[]>;
    findOneAndUpdate(params: FindOneAndUpdateProfileOptions): Promise<void>;
    exists(queryFields: ExistsProfileOptions): Promise<TExistsProfile>;
}