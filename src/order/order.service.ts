import { Injectable } from '@nestjs/common';
import { OrderStatus, Prisma } from '@prisma/client';
import { CartService } from 'src/cart/cart.service';
import { CartItemService } from 'src/cart_item/cart_item.service';
import { CouponService } from 'src/coupon/coupon.service';
import { DatabaseService } from 'src/database/database.service';
import { UserService } from 'src/user/user.service';
import { orderCoupon } from './dto/DTOs.dto';

@Injectable()
export class OrderService {
  constructor(private readonly db: DatabaseService,
              private readonly cart: CartService,
              private readonly cI: CartItemService,
              private readonly coup: CouponService,
              private readonly usr: UserService
  ) {}

  /**
   * Functions Index:
   *    [createNewOrder]
   *    given(cartId)
   *    ==> cart.orderCart and cart_item.retrieveCartTotal, then create new Order row with status `OnTheWay` and `total` = total
   *    
   *    [retrieveOrder]
   *    given(orderId) ==> return an order row
   *    [retrieveAllOrders]
   *    given() ==> return all rows
   *    
   *    [updateStatus]
   *    given(orderId, status) ==> update order's status by the given one
   *    [justApplyCoupon]
   *    given(orderId, couponId) ==> update order.couponId field, coupon.useCoupon, and order.updateTotalAfterCoupon
   *    [updateTotalAfterCoupon]
   *    given(orderId, couponId) ==> update order.total with total * (1 - discount)
   *    
   *    [deleteOrderbyOrderID] **NOT USED
   *    given(orderId) ==> delete cart, then delete order
   *    [deleteOrderbyCartID]
   *    given(cartId) ==> delete an order row
   * 
   * 
   * Endpoints functions:
   *    createOrder(userId) ==> cart.retrieveUserActiveCart, if exists -> createNewOrder
   *                                                         else -> report that
   *    
   *    getOrderbyID(orderId) ==> retrieveOrder, if exists -> cart_item.retrieveCartDetails(cartId, couponId?)
   *                                             else -> report that
   *    
   *    getOrderTotal(orderId) ==> retrieveOrder, if exists -> cart_item.retrieveCartTotal(cartId, couponId?)
   *    
   *    updateOrderStatus(orderId, status) ==> retrieveOrder, if exists -> updateStatus
   *                                                          else -> report that
   *    
   *    applyCoupon(orderId, couponId)
   *    ==> retrieveOrder, if exists -> coupon.retrieveCoupon, if exists and not `Used` -> justApplyCoupon
   *                                                           elif exists -> report it's used
   *                                                           else -> report it doesn't exist
   *                       else -> report order doesn't exist
   *    
   */

  async createNewOrder(cartID: number)
  {
    const res = await this.cart.orderCart(cartID);
    if(typeof res === "string") return res;
    
    const tot = (await this.cI.retrieveCartTotal(cartID))[0].total;
    return await this.db.order.create(
      {
        data: {
          status: "OnTheWay",
          cartId: cartID,
          total: tot
        }
      }
    );
  }

  async retrieveOrder(orderID: number) 
  {
    return await this.db.order.findUnique(
      {
        where: {
          orderId: orderID
        }
      }
    );
  }

  async retrieveAllOrders() 
  {
    return await this.db.order.findMany();
  }

  async updateStatus(orderID: number, stat: OrderStatus)
  {
    await this.db.order.update(
      {
        where: {
          orderId: orderID
        },
        data: {
          status: stat
        }
      }
    );
  }

  async justApplyCoupon(orderID: number, coupId: number)
  {
    await this.db.order.update(
      {
        where: {
          orderId: orderID
        },
        data: {
          couponId: coupId
        }
      }
    );

    await this.coup.useCoupon(coupId);

    await this.updateTotalAfterCoupon(orderID, coupId);
  }

  async updateTotalAfterCoupon(orderID: number, coupId: number)
  {
    const givenCoup = await this.coup.retrieveCoupon(coupId);
    const givenOrder = await this.retrieveOrder(orderID);
    await this.db.order.update(
      {
        where: {
          orderId: orderID
        },
        data: {
          total: givenOrder.total * (1 - givenCoup.discountPct)
        }
      }
    );
  }

  // async deleteOrderbyOrderID(orderID: number) 
  // {
  //   const givenOrder = await this.retrieveOrder(orderID);
    
  //   if(!givenOrder) return;
    
  //   await this.cart.deleteCart(givenOrder.cartId);
  //   await this.deleteOrderbyCartID(givenOrder.cartId);
  // }

  async deleteOrderbyCartID(cartID: number) 
  {
    await this.db.order.deleteMany(
      {
        where: {
          cartId: cartID
        }
      }
    );
  }

  // Endpoint functions:

  async createOrder(userID: number)
  {
    const givenUser = await this.usr.retrieveUserbyUserID(userID);
    if(!givenUser) return "No such user!";

    const activeCart = await this.cart.retrieveUserActiveCart(userID);
    if(activeCart[0]) return await this.createNewOrder(activeCart[0].cartId);
    else return "No active cart for this user!";
  }

  async getOrderbyID(orderID: number)
  {
    const givenOrder = await this.retrieveOrder(orderID);
    if(givenOrder) return await this.cI.retrieveCartDetails(givenOrder.cartId, givenOrder.couponId);
    else return "No such order!";
  }

  async getOrderTotal(orderID: number)
  {
    const givenOrder = await this.retrieveOrder(orderID);
    if(givenOrder)
    {
      const tot = await this.cI.retrieveCartTotal(givenOrder.cartId, givenOrder.couponId);
      return tot[0].total;
    }
    else return "No such order!";
  }

  async updateOrderStatus(orderID: number, stat: OrderStatus)
  {
    const givenOrder = await this.retrieveOrder(orderID);
    if(givenOrder) await this.db.order.update(
      {
        where: {
          orderId: orderID
        },
        data: {
          status: stat
        }
      }
    );
    else return "No such order!";
  }

  async applyCoupon(body: orderCoupon)
  {
    const givenOrder = await this.retrieveOrder(body.orderId);
    if(givenOrder)
    {
      const givenCoup = await this.coup.retrieveCoupon(body.couponId);
      if(givenCoup && givenCoup.status !== "Used") await this.justApplyCoupon(body.orderId, body.orderId);
      else if(givenCoup) return "Can't use this coupon, because it's already used!";
      else return "No such coupon!";
    }
    else return "No such order!";
  }
}
