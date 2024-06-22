import { OrderStatus } from "@prisma/client";
import { IsInt, IsEnum } from "class-validator";

export class orderCoupon
{
    @IsInt()
    orderId: number;
    
    @IsInt()
    couponId: number;
}

export class orderStatusDto
{
    @IsEnum(["OnTheWay", "Arrived", "Canceled"])
    status: OrderStatus;
}

export class userIdDto
{
    @IsInt()
    userId: number;
}