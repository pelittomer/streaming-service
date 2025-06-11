import { Types } from "mongoose";
import { Role, UserDocument } from "src/api/user-service/user/entities/types";

export interface JwtPayload {
    userId: Types.ObjectId;
    username: string;
    roles: Role;
}
export interface IJwtService {
    createJwtPayload(user: UserDocument): JwtPayload;
    signAccessToken(payload: JwtPayload): Promise<string>;
    signRefreshToken(payload: JwtPayload): Promise<string>;
    decodedToken(refreshToken: string): Promise<JwtPayload>;
}