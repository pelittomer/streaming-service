import { Request } from "express";
import { CreateProfileDto } from "../dto/create-profile.dto";
import { Types } from "mongoose";
import { ProfileDocument } from "../entities/types";
import { Profile } from "../entities/profile.entity";
import { UpdateProfileDto } from "../dto/update-profile.dto";

export interface AddProfileParams {
    payload: CreateProfileDto;
    req: Request;
    uploadedImage: Express.Multer.File;
}
export interface GetCurrentProfileParams {
    profileId: Types.ObjectId;
    req: Request;
}
export interface UpdateMyProfileParams {
    payload: UpdateProfileDto;
    req: Request;
    uploadedImage: Express.Multer.File;
    profileId: Types.ObjectId;
}
export interface IProfileService {
    addProfile(params: AddProfileParams): Promise<string>;
    getCurrentProfile(params: GetCurrentProfileParams): Promise<ProfileDocument | null>;
    getUserProfile(req: Request): Promise<Profile[]>;
    updateMyProfile(params: UpdateMyProfileParams): Promise<string>;
}