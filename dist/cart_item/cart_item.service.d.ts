import { CouponService } from 'src/coupon/coupon.service';
import { DatabaseService } from 'src/database/database.service';
import { ProductService } from 'src/product/product.service';
export declare class CartItemService {
    private readonly db;
    private readonly coup;
    private readonly prod;
    constructor(db: DatabaseService, coup: CouponService, prod: ProductService);
    createCartItem(cartID: number, prodId: number, quant: number): Promise<{
        cartId: number;
        productId: number;
        quantity: number;
    }>;
    retrieveAllCartItems(): Promise<{
        cartId: number;
        productId: number;
        quantity: number;
    }[]>;
    retrieveCartItems(cartID: number): Promise<{
        cartId: number;
        productId: number;
        quantity: number;
    }[]>;
    retrieveCartDetails(cartID: number, coupId?: number): Promise<unknown>;
    retrieveCartTotal(cartID: number, coupId?: number): Promise<unknown>;
    retrieveCartItem(cartID: number, prodId: number): Promise<{
        cartId: number;
        productId: number;
        quantity: number;
    }>;
    retrieveCartItemDetails(cartID: number, prodId: number): Promise<unknown>;
    retrieveOutOfStockItems(cartID: number): Promise<unknown>;
    isValidCart(cartID: number): Promise<boolean>;
    updateItemQuantity(cartID: number, prodId: number, quant: number): Promise<void>;
    deleteCartItem(cartID: number, prodId: number): Promise<void>;
    deleteCartItems(cartID: number): Promise<void>;
}
