import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/sign-up.dto';
import { LogInDto } from './dtos/login-dto';
import { AuthGuard } from '@nestjs/passport';
import { PublicGuard } from 'src/common/guards/public.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(PublicGuard)
  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    const data = await this.authService.signUp(signUpDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: '회원가입에 성공했습니다.',
      data,
    };
  }

  @UseGuards(PublicGuard)
  @HttpCode(HttpStatus.OK)
  // Passport를 사용하여 로그인 인증 처리
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async logIn(@Body() logInDto: LogInDto) {
    const data = await this.authService.logIn(logInDto);
    return {
      statusCode: HttpStatus.OK,
      message: '로그인에 성공했습니다.',
      data,
    };
  }

  @Get('token/access')
  @UseGuards(AuthGuard('jwt'))
  access(@Req() req) {
    return req.user;
  }

  @Get('token/refresh')
  @UseGuards(AuthGuard('jwt-refresh-token'))
  refresh(@Req() req) {
    return req.user;
  }

  @HttpCode(HttpStatus.OK)
  @Post('rotate/access')
  @UseGuards(AuthGuard('jwt-refresh-token'))
  async rotateAccessToken(@Req() req) {
    const { email, sub } = req.user;

    const accessToken = await this.authService.genUserAccessToken({
      email,
      id: sub,
    });

    return {
      statusCode: HttpStatus.OK,
      message: '토큰이 갱신되었습니다.',
      data: {
        accessToken,
      },
    };
  }
}
