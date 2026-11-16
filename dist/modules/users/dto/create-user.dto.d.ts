export declare class CreateUserDto {
    uuid: string;
    lastLoginList: Date[];
    connections: number;
    photo: string;
    email?: string;
    name?: string;
    phone?: string;
    dob?: Date;
    password?: string;
}
export declare class InputCreateUserDto {
    uuid: string;
    connections: number;
    email?: string;
    name?: string;
    phone?: string;
    dob?: Date;
    password?: string;
}
