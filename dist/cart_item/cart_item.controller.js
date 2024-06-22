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
exports.CartItemController = void 0;
const common_1 = require("@nestjs/common");
const cart_item_service_1 = require("./cart_item.service");
let CartItemController = class CartItemController {
    constructor(cartItemService) {
        this.cartItemService = cartItemService;
    }
};
exports.CartItemController = CartItemController;
exports.CartItemController = CartItemController = __decorate([
    (0, common_1.Controller)('cart-item'),
    __metadata("design:paramtypes", [cart_item_service_1.CartItemService])
], CartItemController);
//# sourceMappingURL=cart_item.controller.js.map