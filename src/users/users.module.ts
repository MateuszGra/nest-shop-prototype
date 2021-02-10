import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MailModule } from "../mail/mail.module";
import { DiscountCodesModule } from "../discount-codes/discount-codes.module";

@Module({
  imports: [
      forwardRef(() => MailModule),
    forwardRef(() => DiscountCodesModule),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
