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
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const order_service_1 = require("./order.service");
const common_2 = require("@nestjs/common");
const DTOs_dto_1 = require("./dto/DTOs.dto");
const common_3 = require("@nestjs/common");
let OrderController = class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    async applyCoupon(body) {
        return await this.orderService.applyCoupon(body);
    }
    async updateOrderStatus(orderID, body) {
        return await this.orderService.updateOrderStatus(orderID, body.status);
    }
    async getOrderTotal(orderID) {
        return await this.orderService.getOrderTotal(orderID);
    }
    async getOrderbyID(orderID) {
        return await this.orderService.getOrderbyID(orderID);
    }
    async createOrder(body) {
        return await this.orderService.createOrder(body.userId);
    }
    async getAllOrders() {
        return await this.orderService.getAllOrders();
    }
};
exports.OrderController = OrderController;
__decorate([
    (0, common_1.Post)('/apply-coupon'),
    __param(0, (0, common_1.Body)(common_3.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DTOs_dto_1.orderCoupon]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "applyCoupon", null);
__decorate([
    (0, common_1.Put)(':orderID/status'),
    __param(0, (0, common_1.Param)('orderID', common_2.ParseIntPipe)),
    __param(1, (0, common_1.Body)(common_3.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, DTOs_dto_1.orderStatusDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "updateOrderStatus", null);
__decorate([
    (0, common_1.Get)(':orderID/total'),
    __param(0, (0, common_1.Param)('orderID', common_2.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrderTotal", null);
__decorate([
    (0, common_1.Get)(':orderID'),
    __param(0, (0, common_1.Param)('orderID', common_2.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrderbyID", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(common_3.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DTOs_dto_1.userIdDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "createOrder", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getAllOrders", null);
exports.OrderController = OrderController = __decorate([
    (0, common_1.Controller)('api/orders'),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
//# sourceMappingURL=order.controller.js.map