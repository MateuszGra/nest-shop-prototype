import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { BasketModule } from './basket/basket.module';
import { UsersModule } from './users/users.module';
import { CacheModule } from './cache/cache.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ProductsModule,
    BasketModule,
    UsersModule,
    CacheModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
