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
exports.CouponService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let CouponService = class CouponService {
    constructor(db) {
        this.db = db;
    }
    async createCoupon(discount) {
        return await this.db.coupon.create({
            data: {
                status: "Fresh",
                discountPct: discount
            }
        });
    }
    async retrieveAllCoupons() {
        return await this.db.coupon.findMany();
    }
    async retrieveCoupon(coupId) {
        return await this.db.coupon.findUnique({
            where: {
                couponId: coupId
            }
        });
    }
    async handCoupon(coupId) {
        const givenCoup = await this.retrieveCoupon(coupId);
        if (!givenCoup)
            return "No such coupon!";
        await this.db.coupon.update({
            where: {
                couponId: coupId
            },
            data: {
                status: "Handed"
            }
        });
    }
    async useCoupon(coupId) {
        const givenCoup = await this.retrieveCoupon(coupId);
        if (!givenCoup)
            return "No such coupon!";
        await this.db.coupon.update({
            where: {
                couponId: coupId
            },
            data: {
                status: "Used"
            }
        });
    }
    async deleteCoupon(coupId) {
        const givenCoup = await this.retrieveCoupon(coupId);
        if (!givenCoup)
            return "No such coupon!";
        if (givenCoup.status === "Used")
            return "Can't be deleted, because it's used!";
        else
            await this.db.coupon.deleteMany({
                where: {
                    couponId: coupId
                }
            });
    }
};
exports.CouponService = CouponService;
exports.CouponService = CouponService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], CouponService);
//# sourceMappingURL=coupon.service.js.map