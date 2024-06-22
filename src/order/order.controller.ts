import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UnsupportedMediaTypeException } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderStatus, Prisma } from '@prisma/client';
import { ParseIntPipe } from '@nestjs/common';
import { orderCoupon, orderStatusDto, userIdDto } from './dto/DTOs.dto';
import { ValidationPipe } from '@nestjs/common';

@Controller('api/orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  /**
   * Can't use this coupon, because it's already used!
   * No such coupon!
   * No such order!
   * or nothing if success
   */
  @Post('/apply-coupon')
  async applyCoupon(@Body(ValidationPipe) body: orderCoupon)
  {
    return await this.orderService.applyCoupon(body);
  }

  /**
   * No such order!
   * or nothing if success
   */
  @Put(':orderID/status')
  async updateOrderStatus(@Param('orderID', ParseIntPipe) orderID: number, @Body(ValidationPipe) body: orderStatusDto)
  {
    return await this.orderService.updateOrderStatus(orderID, body.status);
  }
  
  /**
   * No such order!
   * or total as single number if success
   */
  @Get(':orderID/total')
  async getOrderTotal(@Param('orderID', ParseIntPipe) orderID: number)
  {
    return await this.orderService.getOrderTotal(orderID);
  }
  
  /**
   * No such order!
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
  @Get(':orderID')
  async getOrderbyID(@Param('orderID', ParseIntPipe) orderID: number)
  {
    return await this.orderService.getOrderbyID(orderID);
  }
  
  /**
   * No such user!
   * No active cart for this user!
   * Some products have become out of stock!
   * or if success
   * {
   *  orderId;
   *  status: "OnTheWay";
   *  cartId;
   *  couponId: null;
   *  total;
   *  orderDate;
   *  updatedAt;
   * }
   */
  @Post()
  async createOrder(@Body(ValidationPipe) body: userIdDto)
  {
    return await this.orderService.createOrder(body.userId);
  }

  /**
   * list of
   * {
   *  orderId;
   *  status: "OnTheWay";
   *  cartId;
   *  couponId: null;
   *  total;
   *  orderDate;
   *  updatedAt;
   * }
   */
  @Get()
  async getAllOrders()
  {
    return await this.orderService.getAllOrders();
  }
}
