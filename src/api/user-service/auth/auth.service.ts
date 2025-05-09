import { BadRequestException, Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserRepository } from '../user/user.repository';
import { compare, genSalt, hash } from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from 'src/config/type';
import { CookieOptions, Response } from 'express';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name)
    private readonly accessTokenExpiresIn = '15m'
    private readonly refreshTokenExpiresIn = '7d'
    private readonly jwtCookieOptions: CookieOptions = {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    }

    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService<AppConfig>
    ) { }


    async register(userInputs: RegisterDto): Promise<string> {
        const { username, email, password } = userInputs

        const userExists = await this.userRepository.findByOrQuery({ username, email })
        if (userExists) {
            if (userExists.username === username) {
                throw new BadRequestException('This username is already in use. Please choose another username.')
            } else if (userExists.email === email) {
                throw new BadRequestException('This email address is already registered. Please use a different email address.')
            }
        }

        //hash the password
        const salt = await genSalt()
        const hashedPassword = await hash(password, salt)

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
            throw new NotFoundException('A user with the entered email address was not found. Please check your email address or register.')
        }

        const matchPassword = await compare(password, foundUser.password)
        if (!matchPassword) {
            throw new UnauthorizedException('The password you entered is incorrect. Please check your password and try again.')
        }

        const payload = {
            username: foundUser.username,
            userId: foundUser._id,
            roles: foundUser.roles
        }

        const accessToken = this.jwtService.sign(payload, { expiresIn: this.accessTokenExpiresIn })
        const refreshToken = this.jwtService.sign(payload, { expiresIn: this.refreshTokenExpiresIn })

        res.cookie('jwt', refreshToken, this.jwtCookieOptions)

        return { accessToken }
    }
}
