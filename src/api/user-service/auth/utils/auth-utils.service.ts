import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UserRepository } from "../../user/repository/user.repository";
import { BcryptService } from "src/modules/bcrypt/service/bcrypt.service";
import { Request } from "express";
import { AUTH_MESSAGES } from "../constants/auth.message";
import { Types } from "mongoose";
import { UserDocument } from "../../user/entities/types";
import { IAuthUtilsService, ValidateNewUserParams, ValidateUserForLoginParams } from "./auth-utils.service.interface";

@Injectable()
export class AuthUtilsService implements IAuthUtilsService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly bcryptService: BcryptService,
    ) { }

    async validateNewUser(params: ValidateNewUserParams): Promise<void> {
        const userExists = await this.userRepository.findByOrQuery(params)
        if (userExists) {
            if (userExists.username === params.username) {
                throw new BadRequestException(AUTH_MESSAGES.USERNAME_ALREADY_IN_USE)
            } else if (userExists.email === params.email) {
                throw new BadRequestException(AUTH_MESSAGES.EMAIL_ALREADY_REGISTERED)
            }
        }
    }

    async validateUserForLogin({ email, password }: ValidateUserForLoginParams): Promise<UserDocument> {
        const foundUser = await this.userRepository.findOne({ email })
        if (!foundUser) {
            throw new NotFoundException(AUTH_MESSAGES.LOGIN_NOT_FOUND)
        }

        await this.bcryptService.verifyPassword(password, foundUser.password)
        return foundUser
    }

    extractRefreshTokenFromCookie(req: Request): string {
        const cookies = req.cookies
        if (!cookies.jwt) {
            throw new UnauthorizedException(AUTH_MESSAGES.REFRESH_TOKEN_MISSING)
        }
        return cookies.jwt
    }

    async validateUserForRefresh(userId: Types.ObjectId): Promise<UserDocument> {
        const foundUser = await this.userRepository.findById(userId)
        if (!foundUser) {
            throw new UnauthorizedException(AUTH_MESSAGES.REFRESH_USER_NOT_FOUND)
        }
        return foundUser
    }
}