import { IsInt } from "class-validator";

export class userProductQuantity
{
    @IsInt()
    userId: number;
    
    @IsInt()
    productId: number;
    
    @IsInt()
    quantity: number
}

export class userProduct
{
    @IsInt()
    userId: number;
    
    @IsInt()
    productId: number;
}