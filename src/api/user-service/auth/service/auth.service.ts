import { ForbiddenException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { RegisterDto } from '../dto/register.dto';
import { UserRepository } from '../../user/repository/user.repository';
import { CookieOptions, Request } from 'express';
import { JwtService } from 'src/modules/jwt/service/jwt.service';
import { BcryptService } from 'src/modules/bcrypt/service/bcrypt.service';
import { AuthUtilsService } from '../utils/auth-utils.service';
import { AUTH_MESSAGES } from '../constants/auth.message';
import { IAuthService, LoginServiceParams, LogoutServiceParams, TAccessToken } from './auth.service.interface';

@Injectable()
export class AuthService implements IAuthService {
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
        private readonly bcryptService: BcryptService,
        private readonly jwtService: JwtService,
        private readonly authUtilsService: AuthUtilsService,
    ) { }

    async register({ email, password, username }: RegisterDto): Promise<string> {
        await this.authUtilsService.validateNewUser({ email, username })

        const hashedPassword = await this.bcryptService.hashPassword(password)
        const user = await this.userRepository.create({
            email, username,
            password: hashedPassword
        })

        this.logger.log(`User registration completed successfully: username=${username}, userId=${user._id}.`)
        return AUTH_MESSAGES.REGISTRATION_COMPLETE_MESSAGE
    }

    async login({ payload, res }: LoginServiceParams): Promise<TAccessToken> {
        const { email, password } = payload

        const user = await this.authUtilsService.validateUserForLogin({ email, password })

        const jwtPayload = this.jwtService.createJwtPayload(user)
        const accessToken = await this.jwtService.signAccessToken(jwtPayload)
        const refreshToken = await this.jwtService.signRefreshToken(jwtPayload)

        res.cookie('jwt', refreshToken, this.jwtCookieOptions)
        return { accessToken }
    }

    logout({ req, res }: LogoutServiceParams): string | undefined {
        const token = req.cookies.jwt
        if (!token) {
            res.sendStatus(HttpStatus.OK)
            return
        }
        res.clearCookie('jwt', this.clearJwtCookieOptions)
        return AUTH_MESSAGES.LOGOUT_SUCCESS_MESSAGE
    }

    async refresh(req: Request): Promise<TAccessToken> {
        const refreshToken = this.authUtilsService.extractRefreshTokenFromCookie(req)

        try {
            const decoded = await this.jwtService.decodedToken(refreshToken)
            const user = await this.authUtilsService.validateUserForRefresh(decoded.userId)

            const jwtPayload = this.jwtService.createJwtPayload(user)
            const accessToken = await this.jwtService.signAccessToken(jwtPayload)
            return { accessToken }
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                throw new ForbiddenException(AUTH_MESSAGES.SESSION_EXPIRED_ERROR)
            } else {
                throw new ForbiddenException(AUTH_MESSAGES.SESSION_VERIFICATION_FAILED_ERROR)
            }
        }
    }
}
