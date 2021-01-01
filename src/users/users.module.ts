import { Module } from '@nestjs/common';
import { Userscontroller } from './userscontroller';
import { UsersService } from './users.service';

@Module({
  controllers: [Userscontroller],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
