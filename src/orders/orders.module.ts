import {forwardRef, Module} from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { UsersModule } from "../users/users.module";
import { ProductsModule } from "../products/products.module";
import { BasketModule } from "../basket/basket.module";

@Module({
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => ProductsModule),
    forwardRef(() => BasketModule),
  ],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}
