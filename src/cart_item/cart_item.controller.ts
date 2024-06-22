import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartItemService } from './cart_item.service';
import { Prisma } from '@prisma/client';

@Controller('cart-item')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}
}
