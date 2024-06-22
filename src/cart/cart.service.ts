import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CartStatus, Prisma } from '@prisma/client';
import { CartItemService } from 'src/cart_item/cart_item.service';
import { DatabaseService } from 'src/database/database.service';
import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/user/user.service';
import { userProduct, userProductQuantity } from './dto/DTOs.dto';

@Injectable()
export class CartService {
  constructor(@Inject(forwardRef(() => UserService))
              private readonly usr: UserService,
              private readonly db: DatabaseService,
              private readonly cI: CartItemService,
              private readonly prod: ProductService
  ) {}

  /**
   * Functions to implement:
   *    [createCart]
   *    given(userId) ==> create new cart
   * 
   *    [retrieveAllCarts]
   *    given() ==> return all rows
   *    [retrieveUserActiveCart]
   *    given(userId) ==> return the row of the `Active` cart
   *    [retrieveUserCarts]
   *    given(userId) ==> return all carts of a user
   *    [retrieveUserOrders]
   *    given(userId) ==> return all carts, where `status` = Ordered, JOIN Order, order by orderDate DESC
   *    
   *    [putCartItem]
   *    given(cartId, productId, quantity)
   *        ==> CASE wasn't put before: if quantity <= stock insert the row, otherwise reject
   *            CASE already exists: if sum(quantity) <= stock update[increase] quantity, otherwise reject
   *    [orderCart]
   *    given(cartId) ==> validate it, then iterate over items and update product.stock by quantity, then update status
   *    [updateCartStatusToOrdered]
   *    given(cartId) ==> update status to `Ordered`
   *    
   *    [deleteCart]
   *    given(cartId) ==> delete items in CartItems, then delete the row
   * 
   * 
   * Endpoints functions:
   *    addToCart(userId, productId, quantity) ==> retrieveUserActiveCart, if exists -> putCartItem,
   *                                                                       else -> createCart -> putCartItem
   *    
   *    viewCart(userId) ==> retrieveUserActiveCart, if exists -> cart_item.retrieveCartDetails,
   *                                                 else -> report that
   *    
   *    updateCart(userId, productId, quantity) ==> retrieveUserActiveCart, if exists -> putCartItem,
   *                                                                        else -> report that
   *    
   *    removeFromCart(userId, productId) ==> retrieveUserActiveCart, if exists -> cart_item.deleteCartItem
   *                                                                  else -> do nothing
   */


  async createCart(userID: number)
  {
    return await this.db.cart.create(
      {
        data: {
          userId: userID,
          status: "Active"
        }
      }
    );
  }

  async retrieveAllCarts() 
  {
    return await this.db.cart.findMany();
  }

  async retrieveCart(cartID: number)
  {
    return await this.db.cart.findUnique(
      {
        where: {
          cartId: cartID
        }
      }
    );
  }

  async retrieveUserActiveCart(userID: number) 
  {
    return await this.db.cart.findMany(
      {
        where: {
          userId: userID,
          status: "Active"
        }
      }
    );
  }

  async retrieveUserCarts(userID: number) 
  {
    return await this.db.cart.findMany(
      {
        where: {
          userId: userID
        }
      }
    );
  }

  async retrieveUserOrders(userID: number) 
  {
    return await this.db.$queryRaw`
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

  async putCartItem(cartID: number, prodId: number, quant: number)
  {
    const givenCI = await this.cI.retrieveCartItem(cartID, prodId);

    if(givenCI)
    {
      if(givenCI.quantity + quant < 0) return "No enough quantity to remove!";
      else if(!(await this.prod.isEnoughStock(prodId, givenCI.quantity + quant))) return "No enough stock!";
      else await this.cI.updateItemQuantity(cartID, prodId, quant);
    }
    else
    {
      if(quant < 0) return "Can't put an item with negative quantity!";
      else await this.cI.createCartItem(cartID, prodId, quant);
    }
      
  }

  async orderCart(cartID: number)
  {
    const valid = await this.cI.isValidCart(cartID);

    if(valid)
    {
      const items = await this.cI.retrieveCartItems(cartID);
      for(var item of items)
      {
        await this.prod.reduceStock(item.productId, item.quantity);
        await this.updateCartStatusToOrdered(cartID);
      }
    }
    else return "Some products have become out of stock!";
  }

  async updateCartStatusToOrdered(cartID: number)
  {
    await this.db.cart.update({
      where: {
        cartId: cartID
      },
      data: {
        status: "Ordered"
      }
    });
  }

  async deleteCart(cartID: number) 
  {
    const givenCart = await this.retrieveCart(cartID);

    await this.cI.deleteCartItems(cartID);

    await this.db.order.deleteMany(
      {
        where: {
          cartId: cartID
        }
      }
    );

    await this.db.cart.deleteMany(
      {
        where: {
          cartId: cartID
        }
      }
    );
  }


  // Endpoints functions

  async addToCart(body: userProductQuantity)
  {
    const givenUser = await this.usr.retrieveUserbyUserID(body.userId);
    if(!givenUser) return "No such user!";

    const givenProd = await this.prod.retrieveProduct(body.productId);
    if(!givenProd) return "No such product!";

    if(body.quantity > givenProd.stock) return "No enough stock!";

    const activeCart = await this.retrieveUserActiveCart(body.userId);
    if(activeCart[0]) return await this.putCartItem(activeCart[0].cartId, body.productId, body.quantity);
    else
    {
      const newCart = await this.createCart(body.userId);
      await this.putCartItem(newCart.cartId, body.quantity, body.quantity);
    }
  }

  async viewCart(userID: number)
  {
    const givenUser = await this.usr.retrieveUserbyUserID(userID);
    if(!givenUser) return "No such user!";

    const activeCart = await this.retrieveUserActiveCart(userID);
    if(activeCart[0]) return await this.cI.retrieveCartDetails(activeCart[0].cartId);
    else return "No active cart for this user!";
  }

  async updateCart(body: userProductQuantity)
  {
    const givenUser = await this.usr.retrieveUserbyUserID(body.userId);
    if(!givenUser) return "No such user!";

    const givenProd = await this.prod.retrieveProduct(body.productId);
    if(!givenProd) return "No such product!";
    if(body.quantity > givenProd.stock) return "No enough stock!";

    const activeCart = await this.retrieveUserActiveCart(body.userId);
    if(activeCart[0]) await this.putCartItem(activeCart[0].cartId, body.productId, body.quantity);
    else return "No active cart for this user!"
  }

  async removeFromCart(body: userProduct)
  {
    const givenUser = await this.usr.retrieveUserbyUserID(body.userId);
    if(!givenUser) return "No such user!";

    const givenProd = await this.prod.retrieveProduct(body.productId);
    if(!givenProd) return "No such product!";

    const activeCart = await this.retrieveUserActiveCart(body.userId);
    if(activeCart[0]) await this.cI.deleteCartItem(activeCart[0].cartId, body.productId);
    else return "No active cart for this user!";
  }
}