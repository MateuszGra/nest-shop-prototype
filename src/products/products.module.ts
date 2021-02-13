import { forwardRef, Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { DiscountCodesModule } from "../discount-codes/discount-codes.module";

@Module({
  imports: [
    forwardRef(() => DiscountCodesModule),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
