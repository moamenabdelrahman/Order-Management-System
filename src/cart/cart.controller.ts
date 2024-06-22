import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { CartService } from './cart.service';
import { Prisma } from '@prisma/client';
import { ParseIntPipe } from '@nestjs/common';
import { userProduct, userProductQuantity } from './dto/DTOs.dto';
import { ValidationPipe } from '@nestjs/common';

@Controller('api/cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  /**
   * No such user!
   * No such product!
   * No enough stock!
   * No enough quantity to remove!
   * Can't put an item with negative quantity!
   * or nothing if success
   */
  @Post('/add')
  async addToCart(@Body(ValidationPipe) body: userProductQuantity)
  {
    return await this.cartService.addToCart(body);
  }

  /**
   * No such user!
   * No such product!
   * No enough stock!
   * No active cart for this user!
   * No enough quantity to remove!
   * Can't put an item with negative quantity!
   * or nothing if success
   */
  @Put('/update')
  async updateCart(@Body(ValidationPipe) body: userProductQuantity)
  {
    return await this.cartService.updateCart(body);
  }

  /**
   * No such user!
   * No such product!
   * No active cart for this user!
   * or nothing if success
   */
  @Delete('/remove')
  async removeFromCart(@Body(ValidationPipe) body: userProduct)
  {
    return await this.cartService.removeFromCart(body);
  }
  
  /**
   * No such user!
   * No active cart for this user!
   * or if success list of
   * {
   *  cartId;
   *  productId;
   *  quantity;
   *  name;
   *  description;
   *  price;
   *  imageURL;
   *  total;
   * }
   */
  @Get(':userID')
  async viewCart(@Param('userID', ParseIntPipe) userID: number)
  {
    return await this.cartService.viewCart(userID);
  }

  /**
   * list of
   * {
   *  cartId;
   *  userId;
   *  status;
   *  createdAt;
   *  updatedAt;
   * }
   */
  @Get()
  async getAllCarts()
  {
    return await this.cartService.retrieveAllCarts();
  }
}
