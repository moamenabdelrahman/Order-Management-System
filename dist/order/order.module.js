"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModule = void 0;
const common_1 = require("@nestjs/common");
const order_service_1 = require("./order.service");
const order_controller_1 = require("./order.controller");
const database_module_1 = require("../database/database.module");
const cart_module_1 = require("../cart/cart.module");
const cart_item_module_1 = require("../cart_item/cart_item.module");
const coupon_module_1 = require("../coupon/coupon.module");
const user_module_1 = require("../user/user.module");
const DTOs_dto_1 = require("./dto/DTOs.dto");
let OrderModule = class OrderModule {
};
exports.OrderModule = OrderModule;
exports.OrderModule = OrderModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule, cart_item_module_1.CartItemModule, (0, common_1.forwardRef)(() => cart_module_1.CartModule), coupon_module_1.CouponModule, (0, common_1.forwardRef)(() => user_module_1.UserModule), DTOs_dto_1.orderCoupon, DTOs_dto_1.orderStatusDto, DTOs_dto_1.userIdDto],
        controllers: [order_controller_1.OrderController],
        providers: [order_service_1.OrderService],
        exports: [order_service_1.OrderService]
    })
], OrderModule);
//# sourceMappingURL=order.module.js.map