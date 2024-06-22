import { OrderStatus } from '@prisma/client';
import { CartService } from 'src/cart/cart.service';
import { CartItemService } from 'src/cart_item/cart_item.service';
import { CouponService } from 'src/coupon/coupon.service';
import { DatabaseService } from 'src/database/database.service';
import { UserService } from 'src/user/user.service';
import { orderCoupon } from './dto/DTOs.dto';
export declare class OrderService {
    private readonly db;
    private readonly cart;
    private readonly cI;
    private readonly coup;
    private readonly usr;
    constructor(db: DatabaseService, cart: CartService, cI: CartItemService, coup: CouponService, usr: UserService);
    createNewOrder(cartID: number): Promise<string | {
        orderId: number;
        cartId: number;
        couponId: number;
        status: import(".prisma/client").$Enums.OrderStatus;
        total: number;
        orderDate: Date;
        updatedAt: Date;
    }>;
    retrieveOrder(orderID: number): Promise<{
        orderId: number;
        cartId: number;
        couponId: number;
        status: import(".prisma/client").$Enums.OrderStatus;
        total: number;
        orderDate: Date;
        updatedAt: Date;
    }>;
    getAllOrders(): Promise<{
        orderId: number;
        cartId: number;
        couponId: number;
        status: import(".prisma/client").$Enums.OrderStatus;
        total: number;
        orderDate: Date;
        updatedAt: Date;
    }[]>;
    retrieveAllOrders(): Promise<{
        orderId: number;
        cartId: number;
        couponId: number;
        status: import(".prisma/client").$Enums.OrderStatus;
        total: number;
        orderDate: Date;
        updatedAt: Date;
    }[]>;
    updateStatus(orderID: number, stat: OrderStatus): Promise<void>;
    justApplyCoupon(orderID: number, coupId: number): Promise<void>;
    updateTotalAfterCoupon(orderID: number, coupId: number): Promise<void>;
    deleteOrderbyOrderID(orderID: number): Promise<void>;
    deleteOrderbyCartID(cartID: number): Promise<void>;
    createOrder(userID: number): Promise<string | {
        orderId: number;
        cartId: number;
        couponId: number;
        status: import(".prisma/client").$Enums.OrderStatus;
        total: number;
        orderDate: Date;
        updatedAt: Date;
    }>;
    getOrderbyID(orderID: number): Promise<unknown>;
    getOrderTotal(orderID: number): Promise<any>;
    updateOrderStatus(orderID: number, stat: OrderStatus): Promise<string>;
    applyCoupon(body: orderCoupon): Promise<"Can't use this coupon, because it's already used!" | "No such coupon!" | "No such order!">;
}
