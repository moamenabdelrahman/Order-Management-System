import { IsString, IsNotEmpty, IsPositive, IsInt, IsOptional, IsUrl} from "class-validator";

export class newProductDto
{
    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsOptional()
    @IsString()
    description?: string;
    
    @IsPositive()
    price: number;

    @IsPositive()
    @IsInt()
    stock: number;
    
    @IsOptional()
    @IsUrl()
    imageURL?: string
}