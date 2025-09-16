import { HttpException } from '@nestjs/common';
export declare class AlreadyExists extends HttpException {
    constructor(value: string);
}
