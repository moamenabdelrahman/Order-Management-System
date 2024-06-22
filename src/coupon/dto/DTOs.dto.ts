import { IsPositive } from "class-validator";

export class discountPctDto
{
    @IsPositive()
    discountPct: number;
}