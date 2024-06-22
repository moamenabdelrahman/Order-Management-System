import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CartModule } from './cart/cart.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { CartItemModule } from './cart_item/cart_item.module';
import { ProductModule } from './product/product.module';
import { CouponModule } from './coupon/coupon.module';

@Module({
  imports: [forwardRef(() => CartModule), forwardRef(() => UserModule), DatabaseModule, OrderModule, CartItemModule, ProductModule, CouponModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
