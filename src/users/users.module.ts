import { Module } from '@nestjs/common';
import { Userscontroller } from './userscontroller';
import { UserService } from './user.service';

@Module({
  controllers: [Userscontroller],
  providers: [UserService]
})
export class UsersModule {}
