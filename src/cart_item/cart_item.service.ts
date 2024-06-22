import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CouponService } from 'src/coupon/coupon.service';
import { DatabaseService } from 'src/database/database.service';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class CartItemService {
  constructor(private readonly db: DatabaseService,
              private readonly coup: CouponService,
              private readonly prod: ProductService
  ) {}

  /**
   * Functions to implement:
   *    [createCartItem]
   *    given(cartId, prodId, quantity) ==> insert it   
   *    
   *    [retrieveAllCartItems]
   *    given() ==> return all rows
   *    [retrieveCartItems]
   *    given(cartId) ==> return all cart items
   *    [retrieveCartDetails]
   *    given(cartId, couponId?) ==> return all CartItem JOIN Product, with field `total` = quantity * price * (discount or 1)
   *    [retrieveCartTotal]
   *    given(cartId, couponId?) ==> return sum of quantity * price * (discount or 1) of all CartItem JOIN Product
   *    [retrieveCartItem]
   *    given(cartId, productId) ==> return a row of CartItem
   *    [retrieveCartItemDetails]
   *    given(cartId, productId) ==> return a row of CartItem JOIN Product
   *    [retrieveOutOfStockItems]
   *    given(cartId) ==> select prod.name of CartItems JOIN Product, where quantity > stock
   *    [isValidCart]
   *    given(cartId) ==> if retrieveOutOfStockItems return true, otherwise false
   *    
   *    [updateItemQuantity]
   *    given(cartId, productId, quantity) ==> update quantity by the given one
   * 
   *    [deleteCartItem]
   *    given(cartId, productId) ==> delete row
   *    [deleteCartItems]
   *    given(cartId) ==> delete all rows of the cart
   */


  async createCartItem(cartID: number, prodId: number, quant: number)
  {
    return await this.db.cartItem.create(
      {
        data: {
          cartId: cartID,
          productId: prodId,
          quantity: quant
        }
      }
    );
  }

  async retrieveAllCartItems() 
  {
    return await this.db.cartItem.findMany();
  }

  async retrieveCartItems(cartID: number) 
  {
    return await this.db.cartItem.findMany(
      {
        where: {
          cartId: cartID
        }
      }
    );
  }

  async retrieveCartDetails(cartID: number, coupId?: number) 
  {
    let discount = 0;
    if(coupId)
    {
      const givenCoup = await this.coup.retrieveCoupon(coupId);
      discount = givenCoup.discountPct;
    }

    return await this.db.$queryRaw`
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

  async retrieveCartTotal(cartID: number, coupId?: number) 
  {
    let discount = 0;
    if(coupId)
    {
      const givenCoup = await this.coup.retrieveCoupon(coupId);
      if(givenCoup) discount = givenCoup.discountPct;
    }

    return await this.db.$queryRaw`
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
  
  async retrieveCartItem(cartID: number, prodId: number) 
  {
    return await this.db.cartItem.findUnique(
      {
        where: {
          cartId_productId: {
            cartId: cartID,
            productId: prodId
          }
        }
      }
    );
  }

  async retrieveCartItemDetails(cartID: number, prodId: number) 
  {
    return await this.db.$queryRaw`
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

  async retrieveOutOfStockItems(cartID: number) 
  {
    return await this.db.$queryRaw`
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

  async isValidCart(cartID: number) 
  {
    const outOfStockProducts = await this.retrieveOutOfStockItems(cartID);

    if(outOfStockProducts[0]) return false
    else return true
  }

  async updateItemQuantity(cartID: number, prodId: number, quant: number) 
  {
    const cartItem = await this.retrieveCartItem(cartID, prodId);
    
    await this.db.cartItem.update(
      {
        where: {
          cartId_productId: {
            cartId: cartID,
            productId: prodId
          }
        },
        data: {
          quantity: cartItem.quantity + quant
        }
      }
    );
  }

  async deleteCartItem(cartID: number, prodId: number) 
  {
    await this.db.cartItem.deleteMany(
      {
        where: {
          cartId: cartID,
          productId: prodId
        }
      }
    );
  }

  async deleteCartItems(cartID: number) 
  {
    await this.db.cartItem.deleteMany(
      {
        where: {
          cartId: cartID
        }
      }
    );
  }
}
