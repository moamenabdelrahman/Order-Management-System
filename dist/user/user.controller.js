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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const common_2 = require("@nestjs/common");
const DTOs_sto_1 = require("./dto/DTOs.sto");
const common_3 = require("@nestjs/common");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getOrderHistory(userID) {
        return await this.userService.getOrderHistory(userID);
    }
    async getUserbyUserID(userID) {
        return await this.userService.retrieveUserbyUserID(userID);
    }
    async deleteUser(userID) {
        await this.userService.deleteUser(userID);
    }
    async createUser(inpBody) {
        const prismaBody = {
            name: inpBody.name,
            email: inpBody.email,
            password: inpBody.password,
            address: inpBody.address,
            phone: inpBody.phone
        };
        return await this.userService.createUser(prismaBody);
    }
    async getAllUsers() {
        return await this.userService.retrieveAllUsers();
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)(':userID/orders'),
    __param(0, (0, common_1.Param)('userID', common_2.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getOrderHistory", null);
__decorate([
    (0, common_1.Get)(':userID'),
    __param(0, (0, common_1.Param)('userID', common_2.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserbyUserID", null);
__decorate([
    (0, common_1.Delete)(':userID'),
    __param(0, (0, common_1.Param)('userID', common_2.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(common_3.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DTOs_sto_1.newUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUsers", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('api/users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map