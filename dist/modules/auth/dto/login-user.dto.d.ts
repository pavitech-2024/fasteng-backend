import { User } from '../../users/schemas';
export declare class InputLoginUserDto {
    email: string;
    password: string;
}
export declare class OutputLoginUserDto {
    statusCode: number;
    token: string;
    user: User;
    email: string;
    name: string;
    planName: string;
}
