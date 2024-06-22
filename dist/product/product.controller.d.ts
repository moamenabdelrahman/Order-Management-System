import { ProductService } from './product.service';
import { newProductDto } from './dto/DTOs.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    getProduct(productID: number): Promise<{
        productId: number;
        name: string;
        description: string;
        price: number;
        stock: number;
        imageURL: string;
    }>;
    delProduct(productID: number): Promise<void>;
    createNewProduct(inpBody: newProductDto): Promise<{
        productId: number;
        name: string;
        description: string;
        price: number;
        stock: number;
        imageURL: string;
    }>;
    getAllProducts(): Promise<{
        productId: number;
        name: string;
        description: string;
        price: number;
        stock: number;
        imageURL: string;
    }[]>;
}
