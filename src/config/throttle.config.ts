import { ThrottlerModuleOptions } from '@nestjs/throttler';

export const throttleModuleOptions: ThrottlerModuleOptions = [
  {
    ttl: 60000,
    limit: 10,
  },
];
