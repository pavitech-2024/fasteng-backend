import { IggService } from '../services';
import { IggInitDto } from '../dto/init-igg.dto';
import { Calc_Igg_Dto, Calc_Igg_Out } from '../dto/calc-igg.dto';
import { Response } from 'express';
export declare class IggController {
    private readonly iggService;
    private logger;
    constructor(iggService: IggService);
    verifyInitIgg(response: Response, body: IggInitDto): Promise<Response<any, Record<string, any>>>;
    calculateIgg(body: Calc_Igg_Dto): Promise<{
        success: boolean;
        result: Calc_Igg_Out;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveEssay(response: Response, body: Calc_Igg_Dto & Calc_Igg_Out): Promise<Response<any, Record<string, any>>>;
    deleteEssay(response: Response, id: string): Promise<Response<any, Record<string, any>>>;
}
