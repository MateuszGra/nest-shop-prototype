import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { BasketModule } from './basket/basket.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ProductsModule,
    BasketModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
