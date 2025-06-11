import { Request } from "express";
import { UserDocument } from "../../user/entities/types";
import { Types } from "mongoose";

export interface ValidateUserForLoginParams {
    email: string;
    password: string;
}
export interface ValidateNewUserParams {
    email: string;
    username: string;
}
export interface IAuthUtilsService {
    validateNewUser(params: ValidateNewUserParams): Promise<void>;
    validateUserForLogin({ email, password }: ValidateUserForLoginParams): Promise<UserDocument>;
    extractRefreshTokenFromCookie(req: Request): string;
    validateUserForRefresh(userId: Types.ObjectId): Promise<UserDocument>;
}