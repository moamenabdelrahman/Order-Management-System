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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartController = void 0;
const common_1 = require("@nestjs/common");
const cart_service_1 = require("./cart.service");
const common_2 = require("@nestjs/common");
const DTOs_dto_1 = require("./dto/DTOs.dto");
const common_3 = require("@nestjs/common");
let CartController = class CartController {
    constructor(cartService) {
        this.cartService = cartService;
    }
    async addToCart(body) {
        return await this.cartService.addToCart(body);
    }
    async updateCart(body) {
        return await this.cartService.updateCart(body);
    }
    async removeFromCart(body) {
        return await this.cartService.removeFromCart(body);
    }
    async viewCart(userID) {
        return await this.cartService.viewCart(userID);
    }
    async getAllCarts() {
        return await this.cartService.retrieveAllCarts();
    }
};
exports.CartController = CartController;
__decorate([
    (0, common_1.Post)('/add'),
    __param(0, (0, common_1.Body)(common_3.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DTOs_dto_1.userProductQuantity]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "addToCart", null);
__decorate([
    (0, common_1.Put)('/update'),
    __param(0, (0, common_1.Body)(common_3.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DTOs_dto_1.userProductQuantity]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "updateCart", null);
__decorate([
    (0, common_1.Delete)('/remove'),
    __param(0, (0, common_1.Body)(common_3.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DTOs_dto_1.userProduct]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "removeFromCart", null);
__decorate([
    (0, common_1.Get)(':userID'),
    __param(0, (0, common_1.Param)('userID', common_2.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "viewCart", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CartController.prototype, "getAllCarts", null);
exports.CartController = CartController = __decorate([
    (0, common_1.Controller)('api/cart'),
    __metadata("design:paramtypes", [cart_service_1.CartService])
], CartController);
//# sourceMappingURL=cart.controller.js.map