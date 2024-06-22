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
exports.CouponController = void 0;
const common_1 = require("@nestjs/common");
const coupon_service_1 = require("./coupon.service");
const common_2 = require("@nestjs/common");
const common_3 = require("@nestjs/common");
const DTOs_dto_1 = require("./dto/DTOs.dto");
let CouponController = class CouponController {
    constructor(couponService) {
        this.couponService = couponService;
    }
    async handCoupon(coupId) {
        return await this.couponService.handCoupon(coupId);
    }
    async deleteCoupon(coupId) {
        return await this.couponService.deleteCoupon(coupId);
    }
    async getCoupon(coupId) {
        return await this.couponService.retrieveCoupon(coupId);
    }
    async createCoupon(body) {
        if (body.discountPct > 1)
            return "Can't apply a discount of more than 1!";
        return await this.couponService.createCoupon(body.discountPct);
    }
    async getAllCoupons() {
        return await this.couponService.retrieveAllCoupons();
    }
};
exports.CouponController = CouponController;
__decorate([
    (0, common_1.Put)(':coupId/hand'),
    __param(0, (0, common_1.Param)('coupId', common_2.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CouponController.prototype, "handCoupon", null);
__decorate([
    (0, common_1.Delete)(':coupId/remove'),
    __param(0, (0, common_1.Param)('coupId', common_2.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CouponController.prototype, "deleteCoupon", null);
__decorate([
    (0, common_1.Get)(':coupId'),
    __param(0, (0, common_1.Param)('coupId', common_2.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CouponController.prototype, "getCoupon", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(common_3.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DTOs_dto_1.discountPctDto]),
    __metadata("design:returntype", Promise)
], CouponController.prototype, "createCoupon", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CouponController.prototype, "getAllCoupons", null);
exports.CouponController = CouponController = __decorate([
    (0, common_1.Controller)('api/coupons'),
    __metadata("design:paramtypes", [coupon_service_1.CouponService])
], CouponController);
//# sourceMappingURL=coupon.controller.js.map