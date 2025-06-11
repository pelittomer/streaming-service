import { Request, Response } from "express";
import { LoginDto } from "../dto/login.dto";
import { RegisterDto } from "../dto/register.dto";

export interface LoginServiceParams {
    payload: LoginDto;
    res: Response;
}
export type TAccessToken = { accessToken: string };
export interface LogoutServiceParams {
    req: Request;
    res: Response;
}
export interface IAuthService {
    register(payload: RegisterDto): Promise<string>;
    login(params: LoginServiceParams): Promise<TAccessToken>;
    logout(params: LogoutServiceParams): string | undefined;
    refresh(req: Request): Promise<TAccessToken>;
}