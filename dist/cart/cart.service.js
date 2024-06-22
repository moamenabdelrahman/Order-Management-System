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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const cart_item_service_1 = require("../cart_item/cart_item.service");
const database_service_1 = require("../database/database.service");
const product_service_1 = require("../product/product.service");
const user_service_1 = require("../user/user.service");
let CartService = class CartService {
    constructor(usr, db, cI, prod) {
        this.usr = usr;
        this.db = db;
        this.cI = cI;
        this.prod = prod;
    }
    async createCart(userID) {
        return await this.db.cart.create({
            data: {
                userId: userID,
                status: "Active"
            }
        });
    }
    async retrieveAllCarts() {
        return await this.db.cart.findMany();
    }
    async retrieveCart(cartID) {
        return await this.db.cart.findUnique({
            where: {
                cartId: cartID
            }
        });
    }
    async retrieveUserActiveCart(userID) {
        return await this.db.cart.findMany({
            where: {
                userId: userID,
                status: "Active"
            }
        });
    }
    async retrieveUserCarts(userID) {
        return await this.db.cart.findMany({
            where: {
                userId: userID
            }
        });
    }
    async retrieveUserOrders(userID) {
        return await this.db.$queryRaw `
      SELECT
        o.*
      FROM (SELECT
              *
            FROM "Cart"
            WHERE "userId" = ${userID} AND "status" = ${"Ordered"}::"CartStatus") c
      JOIN "Order" o
        ON c."cartId" = o."cartId"
      ORDER BY o."orderDate" DESC
    `;
    }
    async putCartItem(cartID, prodId, quant) {
        const givenCI = await this.cI.retrieveCartItem(cartID, prodId);
        if (givenCI) {
            if (givenCI.quantity + quant < 0)
                return "No enough quantity to remove!";
            else if (!(await this.prod.isEnoughStock(prodId, givenCI.quantity + quant)))
                return "No enough stock!";
            else
                await this.cI.updateItemQuantity(cartID, prodId, quant);
        }
        else {
            if (quant < 0)
                return "Can't put an item with negative quantity!";
            else
                await this.cI.createCartItem(cartID, prodId, quant);
        }
    }
    async orderCart(cartID) {
        const valid = await this.cI.isValidCart(cartID);
        if (valid) {
            const items = await this.cI.retrieveCartItems(cartID);
            for (var item of items) {
                await this.prod.reduceStock(item.productId, item.quantity);
                await this.updateCartStatusToOrdered(cartID);
            }
        }
        else
            return "Some products have become out of stock!";
    }
    async updateCartStatusToOrdered(cartID) {
        await this.db.cart.update({
            where: {
                cartId: cartID
            },
            data: {
                status: "Ordered"
            }
        });
    }
    async deleteCart(cartID) {
        const givenCart = await this.retrieveCart(cartID);
        await this.cI.deleteCartItems(cartID);
        await this.db.order.deleteMany({
            where: {
                cartId: cartID
            }
        });
        await this.db.cart.deleteMany({
            where: {
                cartId: cartID
            }
        });
    }
    async addToCart(body) {
        const givenUser = await this.usr.retrieveUserbyUserID(body.userId);
        if (!givenUser)
            return "No such user!";
        const givenProd = await this.prod.retrieveProduct(body.productId);
        if (!givenProd)
            return "No such product!";
        if (body.quantity > givenProd.stock)
            return "No enough stock!";
        const activeCart = await this.retrieveUserActiveCart(body.userId);
        if (activeCart[0])
            return await this.putCartItem(activeCart[0].cartId, body.productId, body.quantity);
        else {
            const newCart = await this.createCart(body.userId);
            await this.putCartItem(newCart.cartId, body.quantity, body.quantity);
        }
    }
    async viewCart(userID) {
        const givenUser = await this.usr.retrieveUserbyUserID(userID);
        if (!givenUser)
            return "No such user!";
        const activeCart = await this.retrieveUserActiveCart(userID);
        if (activeCart[0])
            return await this.cI.retrieveCartDetails(activeCart[0].cartId);
        else
            return "No active cart for this user!";
    }
    async updateCart(body) {
        const givenUser = await this.usr.retrieveUserbyUserID(body.userId);
        if (!givenUser)
            return "No such user!";
        const givenProd = await this.prod.retrieveProduct(body.productId);
        if (!givenProd)
            return "No such product!";
        if (body.quantity > givenProd.stock)
            return "No enough stock!";
        const activeCart = await this.retrieveUserActiveCart(body.userId);
        if (activeCart[0])
            await this.putCartItem(activeCart[0].cartId, body.productId, body.quantity);
        else
            return "No active cart for this user!";
    }
    async removeFromCart(body) {
        const givenUser = await this.usr.retrieveUserbyUserID(body.userId);
        if (!givenUser)
            return "No such user!";
        const givenProd = await this.prod.retrieveProduct(body.productId);
        if (!givenProd)
            return "No such product!";
        const activeCart = await this.retrieveUserActiveCart(body.userId);
        if (activeCart[0])
            await this.cI.deleteCartItem(activeCart[0].cartId, body.productId);
        else
            return "No active cart for this user!";
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_service_1.UserService))),
    __metadata("design:paramtypes", [user_service_1.UserService,
        database_service_1.DatabaseService,
        cart_item_service_1.CartItemService,
        product_service_1.ProductService])
], CartService);
//# sourceMappingURL=cart.service.js.map