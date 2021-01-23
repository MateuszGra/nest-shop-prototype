import { forwardRef, Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { UsersModule } from "../users/users.module";
import { BasketsModule } from "../baskets/baskets.module";
import { MailModule } from "../mail/mail.module";

@Module({
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => BasketsModule),
    forwardRef(() => MailModule),
  ],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}
