import { UserService } from './user.service';
import { newUserDto } from './dto/DTOs.sto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getOrderHistory(userID: number): Promise<unknown>;
    getUserbyUserID(userID: number): Promise<{
        userId: number;
        name: string;
        email: string;
        password: string;
        address: string;
        phone: string;
        createdAt: Date;
    }>;
    deleteUser(userID: number): Promise<void>;
    createUser(inpBody: newUserDto): Promise<{
        userId: number;
        name: string;
        email: string;
        password: string;
        address: string;
        phone: string;
        createdAt: Date;
    }>;
    getAllUsers(): Promise<{
        userId: number;
        name: string;
        email: string;
        password: string;
        address: string;
        phone: string;
        createdAt: Date;
    }[]>;
}
