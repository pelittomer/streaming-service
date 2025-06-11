import { Body, Controller, Get, Post, Req, Res, UseFilters } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';
import { hours, minutes, seconds, Throttle } from '@nestjs/throttler';
import { SignInRateLimitExceptionFilter } from 'src/common/filters/signInExceptionFilter';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('sign-up')
  signUp(@Body() userInputs: RegisterDto) {
    return this.authService.register(userInputs)
  }

  @UseFilters(SignInRateLimitExceptionFilter)
  @Throttle({
    short: { ttl: seconds(60), limit: 3 },
    medium: { ttl: minutes(60), limit: 6 },
    long: { ttl: hours(24), limit: 9 },
  })
  @Post('sign-in')
  signIn(
    @Body() payload: LoginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.login({ payload, res })
  }

  @Post('sign-out')
  signOut(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.logout({ req, res })
  }

  @Get('refresh')
  refresh(@Req() req: Request) {
    return this.authService.refresh(req)
  }
}
