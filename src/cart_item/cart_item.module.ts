import { Module } from '@nestjs/common';
import { CartItemService } from './cart_item.service';
import { CartItemController } from './cart_item.controller';
import { DatabaseModule } from 'src/database/database.module';
import { CouponModule } from 'src/coupon/coupon.module';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [DatabaseModule, CouponModule, ProductModule],
  controllers: [CartItemController],
  providers: [CartItemService],
  exports: [CartItemService]
})
export class CartItemModule {}
