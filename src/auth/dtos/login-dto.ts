import { PickType } from '@nestjs/mapped-types';
import { UserModel } from 'src/user/entities/user.entity';

export class LogInDto extends PickType(UserModel, [
  'email',
  'password',
] as const) {}
