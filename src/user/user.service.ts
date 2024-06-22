import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CartService } from 'src/cart/cart.service';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UserService {
  constructor(private readonly db: DatabaseService,
              @Inject(forwardRef(() => CartService))
              private readonly cart: CartService
  ) {}

  /**
   * Functions to implement:
   *    [createUser]
   *    given(row) ==> insert it
   *    
   *    [retrieveAllUsers]
   *    given() ==> return all rows
   *    [retrieveUserbyUserID]
   *    given(userId) ==> return a row
   *    
   *    [deleteUser]
   *    given(userId) ==> iterate over his carts and for each: delete Order.cartId, then delete Cart.cartId, after all, delete userId
   *    
   *    
   * Endpoints functions:
   *    getOrderHistory(userId) ==> cart.retrieveUserOrders
   */

  async createUser(usr: Prisma.UserCreateInput)
  {
    return await this.db.user.create(
      {
        data: usr
      }
    );
  }

  async retrieveAllUsers()
  {
    return this.db.user.findMany();
  }

  async retrieveUserbyUserID(userID: number) 
  {
    return await this.db.user.findUnique(
      {
        where: {
          userId: userID
        }
      }
    );
  }

  async delUser(userID: number) 
  {
    await this.db.user.deleteMany(
      {
        where: {
          userId: userID
        }
      }
    );
  }


  // Endpoints functions

  async getOrderHistory(userID: number)
  {
    const givenUser = await this.retrieveUserbyUserID(userID);
    if(!givenUser) return "No such user!";
    
    return await this.cart.retrieveUserOrders(userID);
  }

  async deleteUser(userID: number) 
  {
    const userCarts = await this.cart.retrieveUserCarts(userID);
    for(var crt of userCarts)
    {
      await this.cart.deleteCart(crt.cartId);
    }
    await this.delUser(userID);
  }
}
