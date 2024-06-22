import { DatabaseService } from 'src/database/database.service';
export declare class CouponService {
    private readonly db;
    constructor(db: DatabaseService);
    createCoupon(discount: number): Promise<{
        couponId: number;
        status: import(".prisma/client").$Enums.CouponStatus;
        discountPct: number;
        updatedAt: Date;
    }>;
    retrieveAllCoupons(): Promise<{
        couponId: number;
        status: import(".prisma/client").$Enums.CouponStatus;
        discountPct: number;
        updatedAt: Date;
    }[]>;
    retrieveCoupon(coupId: number): Promise<{
        couponId: number;
        status: import(".prisma/client").$Enums.CouponStatus;
        discountPct: number;
        updatedAt: Date;
    }>;
    handCoupon(coupId: number): Promise<string>;
    useCoupon(coupId: number): Promise<string>;
    deleteCoupon(coupId: number): Promise<"No such coupon!" | "Can't be deleted, because it's used!">;
}
