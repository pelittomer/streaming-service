import { BadRequestException, ForbiddenException, HttpStatus, Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserRepository } from '../user/user.repository';
import { compare, genSalt, hash } from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { CookieOptions, Request, Response } from 'express';
import { JwtPayload, JwtService } from 'src/modules/jwt/jwt.service';
import { UserDocument } from '../user/schemas/user.schema';
import { Types } from 'mongoose';
import * as ErrorMessages from "./constants/error-messages.constant"

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name)
    private readonly clearJwtCookieOptions: CookieOptions = {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
    }
    private readonly jwtCookieOptions: CookieOptions = {
        ...this.clearJwtCookieOptions,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    }

    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService,
    ) { }

    private createJwtPayload(user: UserDocument): JwtPayload {
        return {
            username: user.username,
            userId: user._id as Types.ObjectId,
            roles: user.roles,
        }
    }

    private async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
        const match = await compare(password, hashedPassword)
        if (!match) {
            throw new UnauthorizedException(ErrorMessages.INVALID_PASSWORD_ERROR)
        }
        return true
    }

    private async hashPassword(password: string): Promise<string> {
        const salt = await genSalt()
        return await hash(password, salt)
    }

    async register(userInputs: RegisterDto): Promise<string> {
        const { username, email, password } = userInputs

        const userExists = await this.userRepository.findByOrQuery({ username, email })
        if (userExists) {
            if (userExists.username === username) {
                throw new BadRequestException(ErrorMessages.USERNAME_EXISTS_ERROR)
            } else if (userExists.email === email) {
                throw new BadRequestException(ErrorMessages.EMAIL_EXISTS_ERROR)
            }
        }

        const hashedPassword = await this.hashPassword(password)
        const user = await this.userRepository.create({
            ...userInputs,
            password: hashedPassword
        })

        this.logger.log(`User registration completed successfully: username=${username}, userId=${user._id}.`)
        return 'Your registration is complete. You can now log in.'
    }

    async login(userInputs: LoginDto, res: Response): Promise<{ accessToken: string }> {
        const { email, password } = userInputs

        const foundUser = await this.userRepository.findOne({ email })
        if (!foundUser) {
            throw new NotFoundException(ErrorMessages.USER_NOT_FOUND_ERROR)
        }

        await this.verifyPassword(password, foundUser.password)

        const payload = this.createJwtPayload(foundUser)
        const accessToken = await this.jwtService.signAccessToken(payload)
        const refreshToken = await this.jwtService.signRefreshToken(payload)

        res.cookie('jwt', refreshToken, this.jwtCookieOptions)
        return { accessToken }
    }

    logout(req: Request, res: Response): string | undefined {
        const token = req.cookies.jwt
        if (!token) {
            res.sendStatus(HttpStatus.OK)
            return
        }
        res.clearCookie('jwt', this.clearJwtCookieOptions)
        return 'You have successfully logged out.'
    }

    async refresh(req: Request): Promise<{ accessToken: string }> {
        const refreshToken = req.cookies.jwt
        if (!refreshToken) {
            throw new UnauthorizedException(ErrorMessages.REFRESH_TOKEN_MISSING_ERROR)
        }

        try {
            const decoded = await this.jwtService.decodedToken(refreshToken)
            const foundUser = await this.userRepository.findById(decoded.userId)
            if (!foundUser) {
                throw new UnauthorizedException(ErrorMessages.USER_VERIFICATION_FAILED_ERROR)
            }

            const payload = this.createJwtPayload(foundUser)
            const accessToken = await this.jwtService.signAccessToken(payload)
            return { accessToken }
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                throw new ForbiddenException(ErrorMessages.SESSION_EXPIRED_ERROR)
            } else {
                throw new ForbiddenException(ErrorMessages.SESSION_VERIFICATION_FAILED_ERROR)
            }
        }
    }
}
