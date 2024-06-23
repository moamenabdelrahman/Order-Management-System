import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { Prisma } from '@prisma/client';
import { ParseIntPipe } from '@nestjs/common';
import { newProductDto } from './dto/DTOs.dto';
import { ValidationPipe } from '@nestjs/common';

@Controller('api/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  /**
   * returns a product
   * {
   *  productId;
   *  name;
   *  description;
   *  price;
   *  stock;
   *  imageURL;
   * }
   */
  @Get(':productID')
  async getProduct(@Param('productID', ParseIntPipe) productID: number)
  {
    const prod = this.productService.retrieveProduct(productID);
    return prod;
  }

  /**
   * returns nothing
   */
  @Delete(':productID') // *NOTE: may cause referntial integrity issues (be careful)
  async delProduct(@Param('productID', ParseIntPipe) productID: number)
  {
    await this.productService.deleteProduct(productID);
  }

  /**
   * returns the new product
   * {
   *  productId;
   *  name;
   *  description;
   *  price;
   *  stock;
   *  imageURL;
   * }
   */
  @Post()
  async createNewProduct(@Body(ValidationPipe) inpBody: newProductDto)
  {
    const prismaBody: Prisma.ProductCreateInput = {
      name: inpBody.name,
      description: inpBody.description,
      price: inpBody.price,
      stock: inpBody.stock,
      imageURL: inpBody.imageURL
    }
    
    return await this.productService.createProduct(prismaBody);
  }

  /**
   * returns list of
   * {
   *  productId;
   *  name;
   *  description;
   *  price;
   *  stock;
   *  imageURL;
   * }
   */
  @Get() // returns list of all the products
  async getAllProducts()
  {
    return await this.productService.retrieveAllProducts();
  }
}
