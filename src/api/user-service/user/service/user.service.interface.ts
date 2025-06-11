import { Request } from "express";
import { UserWithoutSensitiveInfo } from "../repository/user.repository.interface";

export interface IUserService {
    getCurrentUser(req: Request): Promise<UserWithoutSensitiveInfo>;
}