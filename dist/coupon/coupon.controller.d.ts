import { CouponService } from './coupon.service';
import { discountPctDto } from './dto/DTOs.dto';
export declare class CouponController {
    private readonly couponService;
    constructor(couponService: CouponService);
    handCoupon(coupId: number): Promise<string>;
    deleteCoupon(coupId: number): Promise<"No such coupon!" | "Can't be deleted, because it's used!">;
    getCoupon(coupId: number): Promise<{
        couponId: number;
        status: import(".prisma/client").$Enums.CouponStatus;
        discountPct: number;
        updatedAt: Date;
    }>;
    createCoupon(body: discountPctDto): Promise<{
        couponId: number;
        status: import(".prisma/client").$Enums.CouponStatus;
        discountPct: number;
        updatedAt: Date;
    } | "Can't apply a discount of more than 1!">;
    getAllCoupons(): Promise<{
        couponId: number;
        status: import(".prisma/client").$Enums.CouponStatus;
        discountPct: number;
        updatedAt: Date;
    }[]>;
}
