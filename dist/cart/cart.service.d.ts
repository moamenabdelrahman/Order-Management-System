import { CartItemService } from 'src/cart_item/cart_item.service';
import { DatabaseService } from 'src/database/database.service';
import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/user/user.service';
import { userProduct, userProductQuantity } from './dto/DTOs.dto';
export declare class CartService {
    private readonly usr;
    private readonly db;
    private readonly cI;
    private readonly prod;
    constructor(usr: UserService, db: DatabaseService, cI: CartItemService, prod: ProductService);
    createCart(userID: number): Promise<{
        cartId: number;
        userId: number;
        status: import(".prisma/client").$Enums.CartStatus;
        createdAt: Date;
        updatedAt: Date;
    }>;
    retrieveAllCarts(): Promise<{
        cartId: number;
        userId: number;
        status: import(".prisma/client").$Enums.CartStatus;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    retrieveCart(cartID: number): Promise<{
        cartId: number;
        userId: number;
        status: import(".prisma/client").$Enums.CartStatus;
        createdAt: Date;
        updatedAt: Date;
    }>;
    retrieveUserActiveCart(userID: number): Promise<{
        cartId: number;
        userId: number;
        status: import(".prisma/client").$Enums.CartStatus;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    retrieveUserCarts(userID: number): Promise<{
        cartId: number;
        userId: number;
        status: import(".prisma/client").$Enums.CartStatus;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    retrieveUserOrders(userID: number): Promise<unknown>;
    putCartItem(cartID: number, prodId: number, quant: number): Promise<"No enough quantity to remove!" | "No enough stock!" | "Can't put an item with negative quantity!">;
    orderCart(cartID: number): Promise<string>;
    updateCartStatusToOrdered(cartID: number): Promise<void>;
    deleteCart(cartID: number): Promise<void>;
    addToCart(body: userProductQuantity): Promise<"No such user!" | "No enough quantity to remove!" | "No enough stock!" | "Can't put an item with negative quantity!" | "No such product!">;
    viewCart(userID: number): Promise<unknown>;
    updateCart(body: userProductQuantity): Promise<"No such user!" | "No enough stock!" | "No such product!" | "No active cart for this user!">;
    removeFromCart(body: userProduct): Promise<"No such user!" | "No such product!" | "No active cart for this user!">;
}
