export declare function handleError(error: any, context: string, returnOnlyBoolean: true): false;
export declare function handleError(error: any, context?: string, returnOnlyBoolean?: false): {
    success: false;
    error: {
        status: any;
        message: any;
        name: any;
        code?: any;
        errorDetails?: any;
    };
};
