import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('sign-up')
  signUp(
    @Body() userInputs: RegisterDto
  ) {
    return this.authService.register(userInputs)
  }

  @Post('sign-in')
  signIn(
    @Body() userInputs: LoginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.login(userInputs, res)
  }

  @Post('sign-out')
  signOut() {
    /*
      This function terminates the user's current session or invalidates their access token, effectively logging them out of the system.
    */
  }

  @Get('refresh')
  refresh() {
    /*
      This function is used to obtain a new access token without requiring the user to log in again. This is often done using a refresh token, which has a longer lifespan than the access token.
    */
  }
}
