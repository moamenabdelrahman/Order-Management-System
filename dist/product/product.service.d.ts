import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
export declare class ProductService {
    private readonly db;
    constructor(db: DatabaseService);
    createProduct(prod: Prisma.ProductCreateInput): Promise<{
        productId: number;
        name: string;
        description: string;
        price: number;
        stock: number;
        imageURL: string;
    }>;
    retrieveAllProducts(): Promise<{
        productId: number;
        name: string;
        description: string;
        price: number;
        stock: number;
        imageURL: string;
    }[]>;
    retrieveProduct(id: number): Promise<{
        productId: number;
        name: string;
        description: string;
        price: number;
        stock: number;
        imageURL: string;
    }>;
    isEnoughStock(id: number, quant: number): Promise<boolean>;
    reduceStock(id: number, quant: number): Promise<void>;
    deleteProduct(id: number): Promise<void>;
}
