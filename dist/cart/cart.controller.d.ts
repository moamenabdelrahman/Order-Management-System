import { CartService } from './cart.service';
import { userProduct, userProductQuantity } from './dto/DTOs.dto';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    addToCart(body: userProductQuantity): Promise<"No such user!" | "No enough quantity to remove!" | "No enough stock!" | "Can't put an item with negative quantity!" | "No such product!">;
    updateCart(body: userProductQuantity): Promise<"No such user!" | "No enough stock!" | "No such product!" | "No active cart for this user!">;
    removeFromCart(body: userProduct): Promise<"No such user!" | "No such product!" | "No active cart for this user!">;
    viewCart(userID: number): Promise<unknown>;
    getAllCarts(): Promise<{
        cartId: number;
        userId: number;
        status: import(".prisma/client").$Enums.CartStatus;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
}
