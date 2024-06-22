"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const cart_module_1 = require("./cart/cart.module");
const database_module_1 = require("./database/database.module");
const user_module_1 = require("./user/user.module");
const order_module_1 = require("./order/order.module");
const cart_item_module_1 = require("./cart_item/cart_item.module");
const product_module_1 = require("./product/product.module");
const coupon_module_1 = require("./coupon/coupon.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [(0, common_1.forwardRef)(() => cart_module_1.CartModule), (0, common_1.forwardRef)(() => user_module_1.UserModule), database_module_1.DatabaseModule, order_module_1.OrderModule, cart_item_module_1.CartItemModule, product_module_1.ProductModule, coupon_module_1.CouponModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map