import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('sign-up')
  signUp() {
    /* 
       This function creates a new user account in the system. It typically involves collecting user information such as username, email, and password, and storing it securely.
    */
  }

  @Post('sign-in')
  signIn() {
    /*
       This function allows existing users to access their accounts by verifying their credentials (usually email and password). Upon successful verification, it establishes a session or issues an access token.
    */
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
