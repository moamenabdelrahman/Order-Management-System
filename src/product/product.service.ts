import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ProductService {
  constructor(private readonly db: DatabaseService) {}

  /*
   * Functions Index:
   *    [createProduct]
   *    given(product details) ==> create new product row
   *    
   *    [retrieveAllProducts]
   *    given() ==> return all rows
   *    [retrieveProduct]
   *    given(productId) ==> a product row
   *    [isEnoughStock]
   *    given(productId, quantity) ==> returns true if quantitiy <= stock, otherwise false
   *    
   *    [reduceStock]
   *    given(productId, quantity) ==> reduce product.stock by quantity
   *    
   *    [deleteProduct] *Note: it may cause referential integrity issues (be careful)
   *    given(productId) ==> delete a product row
   */


  async createProduct(prod: Prisma.ProductCreateInput) 
  {
    return await this.db.product.create(
      {
        data: prod
      }
    );
  }
  
  async retrieveAllProducts() 
  {
    return await this.db.product.findMany()
  }

  async retrieveProduct(id: number) 
  {
    return await this.db.product.findUnique(
      {
        where: {
          productId: id
        }
      }
    );
  }


  async isEnoughStock(id: number, quant: number) 
  {
    const prod = await this.retrieveProduct(id);
    return quant <= prod.stock;
  }

  async reduceStock(id: number, quant: number)
  {
    const prod = await this.retrieveProduct(id);

    await this.db.product.update(
      {
        where: {
          productId: id
        },
        data: {
          stock: prod.stock - quant
        }
      }
    );
  }

  async deleteProduct(id: number)
  {
    await this.db.product.deleteMany(
      {
        where: {
          productId: id
        }
      }
    );
  }
}
