import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CouponService {
  constructor(private readonly db: DatabaseService) {}
  
  /**
   * Functions to implement:
   *    [createCoupon]
   *    given(discountPct) ==> create coupon with status `Fresh`
   *    
   *    [retrieveAllCoupons]
   *    given() ==> return all rows
   *    [retrieveCoupon]
   *    given(couponId) ==> retrieve row
   *    
   *    [handCoupon]
   *    given(couponId) ==> update status to `Handed`
   *    [useCoupon]
   *    given(couponId) ==> update status to `Used`
   * 
   *    [deleteCoupon]
   *    given(couponId) ==> delete row
   */


  async createCoupon(discount: number)
  {
    return await this.db.coupon.create(
      {
        data: {
          status: "Fresh",
          discountPct: discount
        }
      }
    );
  }

  async retrieveAllCoupons()
  {
    return await this.db.coupon.findMany();
  }

  async retrieveCoupon(coupId: number) 
  {
    return await this.db.coupon.findUnique(
      {
        where: {
          couponId: coupId
        }
      }
    );
  }

  async handCoupon(coupId: number) 
  {
    const givenCoup = await this.retrieveCoupon(coupId);
    if(!givenCoup) return "No such coupon!";

    await this.db.coupon.update(
      {
        where: {
          couponId: coupId
        },
        data: {
          status: "Handed"
        }
      }
    );
  }

  async useCoupon(coupId: number) 
  {
    const givenCoup = await this.retrieveCoupon(coupId);
    if(!givenCoup) return "No such coupon!";

    await this.db.coupon.update(
      {
        where: {
          couponId: coupId
        },
        data: {
          status: "Used"
        }
      }
    );
  }

  async deleteCoupon(coupId: number) 
  {
    const givenCoup = await this.retrieveCoupon(coupId);
    if(!givenCoup) return "No such coupon!";

    if(givenCoup.status === "Used") return "Can't be deleted, because it's used!";
    else await this.db.coupon.deleteMany(
      {
        where: {
          couponId: coupId
        }
      }
    );
  }
}
