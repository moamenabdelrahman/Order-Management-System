import { Prisma } from '@prisma/client';
import { CartService } from 'src/cart/cart.service';
import { DatabaseService } from 'src/database/database.service';
export declare class UserService {
    private readonly db;
    private readonly cart;
    constructor(db: DatabaseService, cart: CartService);
    createUser(usr: Prisma.UserCreateInput): Promise<{
        userId: number;
        name: string;
        email: string;
        password: string;
        address: string;
        phone: string;
        createdAt: Date;
    }>;
    retrieveAllUsers(): Promise<{
        userId: number;
        name: string;
        email: string;
        password: string;
        address: string;
        phone: string;
        createdAt: Date;
    }[]>;
    retrieveUserbyUserID(userID: number): Promise<{
        userId: number;
        name: string;
        email: string;
        password: string;
        address: string;
        phone: string;
        createdAt: Date;
    }>;
    delUser(userID: number): Promise<void>;
    getOrderHistory(userID: number): Promise<unknown>;
    deleteUser(userID: number): Promise<void>;
}
