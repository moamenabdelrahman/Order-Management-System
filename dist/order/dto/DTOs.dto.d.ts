import { OrderStatus } from "@prisma/client";
export declare class orderCoupon {
    orderId: number;
    couponId: number;
}
export declare class orderStatusDto {
    status: OrderStatus;
}
export declare class userIdDto {
    userId: number;
}
