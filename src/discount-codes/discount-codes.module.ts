import { Module } from '@nestjs/common';
import { DiscountCodesService } from './discount-codes.service';
import { DiscountCodesController } from './discount-codes.controller';

@Module({
  providers: [DiscountCodesService],
  controllers: [DiscountCodesController],
  exports: [DiscountCodesService],
})
export class DiscountCodesModule {}
