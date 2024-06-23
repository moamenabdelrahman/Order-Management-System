import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { Prisma } from '@prisma/client';
import { ParseIntPipe } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { discountPctDto } from './dto/DTOs.dto';

@Controller('api/coupons')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  /**
   * Returns:
   * No such coupon!
   * or nothing if success
   */
  @Put(':coupId/hand')
  async handCoupon(@Param('coupId', ParseIntPipe) coupId: number)
  {
    return await this.couponService.handCoupon(coupId);
  }

  /**
   * Returns:
   * No such coupon!
   * Can't be deleted, because it's used!
   * or nothing if success
   */
  @Delete(':coupId/remove')
  async deleteCoupon(@Param('coupId', ParseIntPipe) coupId: number)
  {
    return await this.couponService.deleteCoupon(coupId);
  }

  /**
   * Returns:
   * return the coupon
   * {
   *  couponId;
   *  status;
   *  discountPct;
   *  updatedAt;
   * }
   */
  @Get(':coupId')
  async getCoupon(@Param('coupId', ParseIntPipe) coupId: number)
  {
    return await this.couponService.retrieveCoupon(coupId);
  }

  /**
   * Returns:
   * Can't apply a discount of more than 1!
   * or if success
   * {
   *  couponId;
   *  status = "Fresh";
   *  discountPct;
   *  updatedAt;
   * }
   */
  @Post()
  async createCoupon(@Body(ValidationPipe) body: discountPctDto)
  {
    if(body.discountPct > 1) return "Can't apply a discount of more than 1!";
    return await this.couponService.createCoupon(body.discountPct);
  }

  /**
   * Returns:
   * returns list of
   * {
   *  couponId;
   *  status;
   *  discountPct;
   *  updatedAt;
   * }
   */
  @Get()
  async getAllCoupons()
  {
    return await this.couponService.retrieveAllCoupons();
  }
}
