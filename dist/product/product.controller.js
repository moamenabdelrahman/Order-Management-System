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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const common_2 = require("@nestjs/common");
const DTOs_dto_1 = require("./dto/DTOs.dto");
const common_3 = require("@nestjs/common");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    async getProduct(productID) {
        const prod = this.productService.retrieveProduct(productID);
        return prod;
    }
    async delProduct(productID) {
        await this.productService.deleteProduct(productID);
    }
    async createNewProduct(inpBody) {
        const prismaBody = {
            name: inpBody.name,
            description: inpBody.description,
            price: inpBody.price,
            stock: inpBody.stock,
            imageURL: inpBody.imageURL
        };
        return await this.productService.createProduct(prismaBody);
    }
    async getAllProducts() {
        return await this.productService.retrieveAllProducts();
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, common_1.Get)(':productID'),
    __param(0, (0, common_1.Param)('productID', common_2.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProduct", null);
__decorate([
    (0, common_1.Delete)(':productID'),
    __param(0, (0, common_1.Param)('productID', common_2.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "delProduct", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(common_3.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DTOs_dto_1.newProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "createNewProduct", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getAllProducts", null);
exports.ProductController = ProductController = __decorate([
    (0, common_1.Controller)('api/products'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
//# sourceMappingURL=product.controller.js.map