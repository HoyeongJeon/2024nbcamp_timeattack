import { Column, Entity } from 'typeorm';
import { BaseModel } from 'src/common/entities/base.entity';
import {
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';
import { Exclude } from 'class-transformer';

@Entity()
export class UserModel extends BaseModel {
  @IsNotEmpty({
    message: '이메일은 필수 입력입니다.',
  })
  @IsString()
  @IsEmail(
    {},
    {
      message: '이메일 형식이 아닙니다.',
    },
  )
  @Column({
    unique: true,
  })
  email: string;

  @IsNotEmpty({
    message: '이름은 필수 입력입니다.',
  })
  @IsString()
  @Length(1, 20)
  @Column({
    length: 20,
  })
  name: string;

  @IsNotEmpty({
    message: '전화번호는 필수 입력입니다.',
  })
  @IsString()
  @IsMobilePhone(
    'ko-KR',
    {
      strictMode: true,
    },
    {
      message: '전화번호 형식이 아닙니다.',
    },
  )
  @Column({
    unique: true,
  })
  phone: string;

  @IsNotEmpty({
    message: '비밀번호는 필수 입력입니다.',
  })
  @IsString()
  @Exclude({
    toPlainOnly: true,
  })
  @IsStrongPassword(
    { minLength: 6 },
    {
      message:
        '비밀번호는 최소 6자리에 숫자, 영문 대문자, 영문 소문자, 특수문자가 포함되어야 합니다.',
    },
  )
  @Column()
  password: string;
}
