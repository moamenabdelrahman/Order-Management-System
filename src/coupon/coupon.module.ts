import { Module } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CouponController } from './coupon.controller';
import { DatabaseModule } from 'src/database/database.module';
import { discountPctDto } from './dto/DTOs.dto';

@Module({
  imports: [DatabaseModule, discountPctDto],
  controllers: [CouponController],
  providers: [CouponService],
  exports: [CouponService]
})
export class CouponModule {}
