import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from './dtos/sign-up.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { LogInDto } from './dtos/login-dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email: signUpDto.email },
    });

    // 이미 가입된 이메일인지 확인
    if (existingUser) {
      throw new ConflictException('이미 가입된 이메일입니다.');
    }

    // 이미 가입된 전화번호인지 확인
    const existingPhone = await this.userRepository.findOne({
      where: { phone: signUpDto.phone },
    });
    if (existingPhone) {
      throw new ConflictException('이미 가입된 전화번호입니다.');
    }
    // 비밀번호 확인
    if (signUpDto.password !== signUpDto.passwordCheck) {
      throw new BadRequestException('비밀번호가 일치하지 않습니다.');
    }

    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(
      signUpDto.password,
      parseInt(this.configService.get<string>('PASSWORD_HASH_ROUND')),
    );

    const user = await this.userRepository.save({
      ...signUpDto,
      password: hashedPassword,
    });

    return this.genUserToken(user);
  }

  async logIn(logInDto: LogInDto) {
    const user = await this.userRepository.findOne({
      where: { email: logInDto.email },
      select: ['id', 'email', 'password'],
    });

    // 이메일을 찾을 수 없음 오류 처리
    // 이메일-비밀번호 불일치 오류 처리
    const ok = bcrypt.compareSync(logInDto.password, user?.password ?? '');

    if (!user || !ok) {
      throw new UnauthorizedException(
        '이메일 또는 비밀번호가 일치하지 않습니다.',
      );
    }

    // JWT 토큰 생성 및 반환
    return this.genUserToken(user);
  }

  // 유저 토큰 반환
  async genUserToken(user: Pick<UserModel, 'email' | 'id'>) {
    const accessToken = await this.genUserAccessToken(user);
    const refreshToken = await this.genUserRefreshToken(user);

    return { accessToken, refreshToken };
  }

  // access token 생성
  async genUserAccessToken(user: Pick<UserModel, 'email' | 'id'>) {
    const payload = { email: user.email, sub: user.id };
    // accessToken
    const accessToken = await this.jwtService.signAsync(
      {
        ...payload,
        type: 'access',
      },
      {
        expiresIn: this.configService.get<string>(
          'JWT_ACCESS_TOKEN_EXPIRATION',
        ),
      },
    );
    return accessToken;
  }

  // refresh token 생성
  async genUserRefreshToken(user: Pick<UserModel, 'email' | 'id'>) {
    const payload = { email: user.email, sub: user.id };
    const refreshToken = await this.jwtService.signAsync(
      { ...payload, type: 'refresh' },
      {
        expiresIn: this.configService.get<string>(
          'JWT_REFRESH_TOKEN_EXPIRATION',
        ),
      },
    );
    return refreshToken;
  }
}
