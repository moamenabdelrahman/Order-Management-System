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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const cart_service_1 = require("../cart/cart.service");
const database_service_1 = require("../database/database.service");
let UserService = class UserService {
    constructor(db, cart) {
        this.db = db;
        this.cart = cart;
    }
    async createUser(usr) {
        return await this.db.user.create({
            data: usr
        });
    }
    async retrieveAllUsers() {
        return this.db.user.findMany();
    }
    async retrieveUserbyUserID(userID) {
        return await this.db.user.findUnique({
            where: {
                userId: userID
            }
        });
    }
    async delUser(userID) {
        await this.db.user.deleteMany({
            where: {
                userId: userID
            }
        });
    }
    async getOrderHistory(userID) {
        const givenUser = await this.retrieveUserbyUserID(userID);
        if (!givenUser)
            return "No such user!";
        return await this.cart.retrieveUserOrders(userID);
    }
    async deleteUser(userID) {
        const userCarts = await this.cart.retrieveUserCarts(userID);
        for (var crt of userCarts) {
            await this.cart.deleteCart(crt.cartId);
        }
        await this.delUser(userID);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => cart_service_1.CartService))),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        cart_service_1.CartService])
], UserService);
//# sourceMappingURL=user.service.js.map