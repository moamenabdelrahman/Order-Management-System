import { OrderService } from './order.service';
import { orderCoupon, orderStatusDto, userIdDto } from './dto/DTOs.dto';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    applyCoupon(body: orderCoupon): Promise<"No such coupon!" | "No such order!" | "Can't use this coupon, because it's already used!">;
    updateOrderStatus(orderID: number, body: orderStatusDto): Promise<string>;
    getOrderTotal(orderID: number): Promise<any>;
    getOrderbyID(orderID: number): Promise<unknown>;
    createOrder(body: userIdDto): Promise<string | {
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
}
