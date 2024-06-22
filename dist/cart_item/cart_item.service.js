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
exports.CartItemService = void 0;
const common_1 = require("@nestjs/common");
const coupon_service_1 = require("../coupon/coupon.service");
const database_service_1 = require("../database/database.service");
const product_service_1 = require("../product/product.service");
let CartItemService = class CartItemService {
    constructor(db, coup, prod) {
        this.db = db;
        this.coup = coup;
        this.prod = prod;
    }
    async createCartItem(cartID, prodId, quant) {
        return await this.db.cartItem.create({
            data: {
                cartId: cartID,
                productId: prodId,
                quantity: quant
            }
        });
    }
    async retrieveAllCartItems() {
        return await this.db.cartItem.findMany();
    }
    async retrieveCartItems(cartID) {
        return await this.db.cartItem.findMany({
            where: {
                cartId: cartID
            }
        });
    }
    async retrieveCartDetails(cartID, coupId) {
        let discount = 0;
        if (coupId) {
            const givenCoup = await this.coup.retrieveCoupon(coupId);
            discount = givenCoup.discountPct;
        }
        return await this.db.$queryRaw `
      SELECT
        c.*,
        p."name", p."description", p."price", p."imageURL",
        c."quantity" * p."price" * ${(1 - discount)} AS "total"
      FROM (SELECT
              *
            FROM "CartItem"
            WHERE "cartId" = ${cartID}) c
      JOIN "Product" p
        ON c."productId" = p."productId"
    `;
    }
    async retrieveCartTotal(cartID, coupId) {
        let discount = 0;
        if (coupId) {
            const givenCoup = await this.coup.retrieveCoupon(coupId);
            if (givenCoup)
                discount = givenCoup.discountPct;
        }
        return await this.db.$queryRaw `
      SELECT
        SUM(c."quantity" * p."price" * ${(1 - discount)}) AS "total"
      FROM (SELECT
              *
            FROM "CartItem"
            WHERE "cartId" = ${cartID}) c
      JOIN "Product" p
        ON c."productId" = p."productId"
      -- GROUP BY c."cartId"
    `;
    }
    async retrieveCartItem(cartID, prodId) {
        return await this.db.cartItem.findUnique({
            where: {
                cartId_productId: {
                    cartId: cartID,
                    productId: prodId
                }
            }
        });
    }
    async retrieveCartItemDetails(cartID, prodId) {
        return await this.db.$queryRaw `
      SELECT
        *
      FROM (SELECT
              *
            FROM "CartItem"
            WHERE "cartId" = ${cartID} AND "productId" = ${prodId}) c
      JOIN "Product" p
        ON c."productId" = p."productId"
    `;
    }
    async retrieveOutOfStockItems(cartID) {
        return await this.db.$queryRaw `
      SELECT
        "name"
      FROM ((SELECT
                *
              FROM "CartItem"
              WHERE "cartId" = ${cartID}) c
              JOIN "Product" p
                ON c."productId" = p."productId")
      WHERE "quantity" > "stock" 
    `;
    }
    async isValidCart(cartID) {
        const outOfStockProducts = await this.retrieveOutOfStockItems(cartID);
        if (outOfStockProducts[0])
            return false;
        else
            return true;
    }
    async updateItemQuantity(cartID, prodId, quant) {
        const cartItem = await this.retrieveCartItem(cartID, prodId);
        await this.db.cartItem.update({
            where: {
                cartId_productId: {
                    cartId: cartID,
                    productId: prodId
                }
            },
            data: {
                quantity: cartItem.quantity + quant
            }
        });
    }
    async deleteCartItem(cartID, prodId) {
        await this.db.cartItem.deleteMany({
            where: {
                cartId: cartID,
                productId: prodId
            }
        });
    }
    async deleteCartItems(cartID) {
        await this.db.cartItem.deleteMany({
            where: {
                cartId: cartID
            }
        });
    }
};
exports.CartItemService = CartItemService;
exports.CartItemService = CartItemService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        coupon_service_1.CouponService,
        product_service_1.ProductService])
], CartItemService);
//# sourceMappingURL=cart_item.service.js.map