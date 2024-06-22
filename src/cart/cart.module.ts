import { Module, forwardRef } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { DatabaseModule } from 'src/database/database.module';
import { CartItemModule } from 'src/cart_item/cart_item.module';
import { ProductModule } from 'src/product/product.module';
import { UserModule } from 'src/user/user.module';
import { userProduct, userProductQuantity } from './dto/DTOs.dto';

@Module({
  imports: [DatabaseModule, CartItemModule, ProductModule, forwardRef(() => UserModule), userProduct, userProductQuantity],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService]
})
export class CartModule {}
