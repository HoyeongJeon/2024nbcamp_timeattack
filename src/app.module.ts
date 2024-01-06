import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { typeOrmModuleOptions } from './config/db.config';
import { throttleModuleOptions } from './config/throttle.config';
import { configModuleOptions } from './config/env.config';

@Module({
  imports: [
    // 브루트 포스 공격 방지
    // 가드 설정 해줘야함
    ThrottlerModule.forRoot(throttleModuleOptions),
    ConfigModule.forRoot(configModuleOptions),
    TypeOrmModule.forRootAsync(typeOrmModuleOptions),
    UserModule,
    CommonModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
