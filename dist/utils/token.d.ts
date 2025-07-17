type tokenData = {
    planName: string;
    email: string;
    name: string;
    userId: string;
    lastLogin: Date;
};
export declare class Token {
    private config;
    private logger;
    value: string;
    createToken(data: tokenData, expiresIn: any): string;
    verifyToken(token: string): boolean;
}
export {};
