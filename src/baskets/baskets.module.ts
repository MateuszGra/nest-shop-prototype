import { forwardRef, Module } from '@nestjs/common';
import { BasketsController } from './baskets.controller';
import { BasketsService } from './baskets.service';
import { ProductsModule } from "../products/products.module";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => ProductsModule),
  ],
  controllers: [BasketsController],
  providers: [BasketsService],
  exports: [BasketsService],
})
export class BasketsModule {}
