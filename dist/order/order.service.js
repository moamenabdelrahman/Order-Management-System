"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const cart_service_1 = require("../cart/cart.service");
const cart_item_service_1 = require("../cart_item/cart_item.service");
const coupon_service_1 = require("../coupon/coupon.service");
const database_service_1 = require("../database/database.service");
const user_service_1 = require("../user/user.service");
let OrderService = class OrderService {
    constructor(db, cart, cI, coup, usr) {
        this.db = db;
        this.cart = cart;
        this.cI = cI;
        this.coup = coup;
        this.usr = usr;
    }
    async createNewOrder(cartID) {
        const res = await this.cart.orderCart(cartID);
        if (typeof res === "string")
            return res;
        const tot = (await this.cI.retrieveCartTotal(cartID))[0].total;
        return await this.db.order.create({
            data: {
                status: "OnTheWay",
                cartId: cartID,
                total: tot
            }
        });
    }
    async retrieveOrder(orderID) {
        return await this.db.order.findUnique({
            where: {
                orderId: orderID
            }
        });
    }
    async getAllOrders() {
        return await this.db.order.findMany();
    }
    async retrieveAllOrders() {
        return await this.db.order.findMany();
    }
    async updateStatus(orderID, stat) {
        await this.db.order.update({
            where: {
                orderId: orderID
            },
            data: {
                status: stat
            }
        });
    }
    async justApplyCoupon(orderID, coupId) {
        await this.db.order.update({
            where: {
                orderId: orderID
            },
            data: {
                couponId: coupId
            }
        });
        await this.coup.useCoupon(coupId);
        await this.updateTotalAfterCoupon(orderID, coupId);
    }
    async updateTotalAfterCoupon(orderID, coupId) {
        const givenCoup = await this.coup.retrieveCoupon(coupId);
        const givenOrder = await this.retrieveOrder(orderID);
        await this.db.order.update({
            where: {
                orderId: orderID
            },
            data: {
                total: givenOrder.total * (1 - givenCoup.discountPct)
            }
        });
    }
    async deleteOrderbyOrderID(orderID) {
        const givenOrder = await this.retrieveOrder(orderID);
        if (!givenOrder)
            return;
        await this.cart.deleteCart(givenOrder.cartId);
        await this.deleteOrderbyCartID(givenOrder.cartId);
    }
    async deleteOrderbyCartID(cartID) {
        await this.db.order.deleteMany({
            where: {
                cartId: cartID
            }
        });
    }
    async createOrder(userID) {
        const givenUser = await this.usr.retrieveUserbyUserID(userID);
        if (!givenUser)
            return "No such user!";
        const activeCart = await this.cart.retrieveUserActiveCart(userID);
        if (activeCart[0])
            return await this.createNewOrder(activeCart[0].cartId);
        else
            return "No active cart for this user!";
    }
    async getOrderbyID(orderID) {
        const givenOrder = await this.retrieveOrder(orderID);
        if (givenOrder)
            return await this.cI.retrieveCartDetails(givenOrder.cartId, givenOrder.couponId);
        else
            return "No such order!";
    }
    async getOrderTotal(orderID) {
        const givenOrder = await this.retrieveOrder(orderID);
        if (givenOrder) {
            const tot = await this.cI.retrieveCartTotal(givenOrder.cartId, givenOrder.couponId);
            return tot[0].total;
        }
        else
            return "No such order!";
    }
    async updateOrderStatus(orderID, stat) {
        const givenOrder = await this.retrieveOrder(orderID);
        if (givenOrder)
            await this.db.order.update({
                where: {
                    orderId: orderID
                },
                data: {
                    status: stat
                }
            });
        else
            return "No such order!";
    }
    async applyCoupon(body) {
        const givenOrder = await this.retrieveOrder(body.orderId);
        if (givenOrder) {
            const givenCoup = await this.coup.retrieveCoupon(body.couponId);
            if (givenCoup && givenCoup.status !== "Used")
                await this.justApplyCoupon(body.orderId, body.orderId);
            else if (givenCoup)
                return "Can't use this coupon, because it's already used!";
            else
                return "No such coupon!";
        }
        else
            return "No such order!";
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        cart_service_1.CartService,
        cart_item_service_1.CartItemService,
        coupon_service_1.CouponService,
        user_service_1.UserService])
], OrderService);
//# sourceMappingURL=order.service.js.map