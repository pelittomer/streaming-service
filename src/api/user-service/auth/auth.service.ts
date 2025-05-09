import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserRepository } from '../user/user.repository';
import { genSalt, hash } from 'bcrypt';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name)

    constructor(
        private readonly userRepository: UserRepository
    ) { }


    async register(userInputs: RegisterDto) {
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
}
