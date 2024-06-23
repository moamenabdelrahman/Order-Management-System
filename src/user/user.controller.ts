import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma } from '@prisma/client';
import { ParseIntPipe } from '@nestjs/common';
import { newUserDto } from './dto/DTOs.sto';
import { ValidationPipe } from '@nestjs/common';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Returns:
   * No such user!
   * or if success list of
   * {
   *  orderId;
   *  cartId;
   *  status;
   *  orderDate;
   *  updatedAt;
   *  coupounId;
   *  total;
   * }
   */
  @Get(':userID/orders')
  async getOrderHistory(@Param('userID', ParseIntPipe) userID: number)
  {
    return await this.userService.getOrderHistory(userID);
  }

  /**
   * Returns:
   * {
   *  userId;
   *  name;
   *  email;
   *  password;
   *  address;
   *  phone;
   *  createdAt;
   * }
   */
  @Get(':userID')
  async getUserbyUserID(@Param('userID', ParseIntPipe) userID: number)
  {
    return await this.userService.retrieveUserbyUserID(userID);
  }

  // Returns: nothing
  @Delete(':userID')
  async deleteUser(@Param('userID', ParseIntPipe) userID: number)
  {
    await this.userService.deleteUser(userID);
  }

  /**
   * Returns: the new user
   * {
   *  userId;
   *  name;
   *  email;
   *  password;
   *  address;
   *  phone;
   *  createdAt;
   * }
   */
  @Post()
  async createUser(@Body(ValidationPipe) inpBody: newUserDto)
  {
    const prismaBody: Prisma.UserCreateInput = {
      name: inpBody.name,
      email: inpBody.email,
      password: inpBody.password,
      address: inpBody.address,
      phone: inpBody.phone
    }
    
    return await this.userService.createUser(prismaBody);
  }

  /**
   * Returns: list of users
   * {
   *  userId;
   *  name;
   *  email;
   *  password;
   *  address;
   *  phone;
   *  createdAt;
   * }
   */
  @Get()
  async getAllUsers()
  {
    return await this.userService.retrieveAllUsers();
  }
}
