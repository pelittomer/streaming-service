import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from 'src/modules/jwt/jwt.module';
import { BcryptModule } from 'src/modules/bcrypt/bcrypt.module';
import { AuthUtilsService } from './utils/auth-utils.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthUtilsService],
  imports: [UserModule, JwtModule, BcryptModule]
})
export class AuthModule { }
