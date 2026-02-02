import { ChapmanInitDto } from '../dto/chapman-init.dto';
import { ChapmanService } from '../service/champan.service';
import { Calc_CHAPMAN_Out, Calc_CHAPMAN_dto } from '../dto/calc.chapman.dto';
import { Response } from 'express';
export declare class ChapmanController {
    private readonly chapmanService;
    private logger;
    constructor(chapmanService: ChapmanService);
    verifyInitChapman(response: Response, body: ChapmanInitDto): Promise<Response<any, Record<string, any>>>;
    calculateChapman(body: Calc_CHAPMAN_dto): Promise<{
        success: boolean;
        result: {
            m_e: number;
        };
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveEssay(response: Response, body: Calc_CHAPMAN_dto & Calc_CHAPMAN_Out): Promise<Response<any, Record<string, any>>>;
}
