import { Module, forwardRef } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { DatabaseModule } from 'src/database/database.module';
import { CartModule } from 'src/cart/cart.module';
import { CartItemModule } from 'src/cart_item/cart_item.module';
import { CouponModule } from 'src/coupon/coupon.module';
import { UserModule } from 'src/user/user.module';
import { orderCoupon, orderStatusDto, userIdDto } from './dto/DTOs.dto';

@Module({
  imports: [DatabaseModule, CartItemModule, forwardRef(() => CartModule), CouponModule, forwardRef(() => UserModule), orderCoupon, orderStatusDto, userIdDto],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService]
})
export class OrderModule {}
