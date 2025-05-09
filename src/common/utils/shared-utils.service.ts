import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { UserInfo } from "../types";


@Injectable()
export class SharedUtilsService {

    getUserInfo(req: Request): UserInfo {
        const user = req['UserInfo']
        if (!user) {
            throw new UnauthorizedException('You must be logged in.')
        }
        return user
    }
}