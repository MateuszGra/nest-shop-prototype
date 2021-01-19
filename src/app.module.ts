import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { BasketsModule } from './baskets/baskets.module';
import { UsersModule } from './users/users.module';
import { CacheModule } from './cache/cache.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ProductsModule,
    BasketsModule,
    UsersModule,
    CacheModule,
    OrdersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
