import { Calc_Ddui_Dto, Calc_Ddui_Out } from "../dto/calc-ddui.dto";
import { DduiInitDto } from "../dto/init-ddui.dto";
import { Response } from 'express';
import { DduiService } from "../service";
export declare class DduiController {
    private readonly dduiService;
    private logger;
    constructor(dduiService: DduiService);
    verifyInitDdui(response: Response, body: DduiInitDto): Promise<Response<any, Record<string, any>>>;
    calculateDdui(body: any): Promise<{
        success: boolean;
        result: Calc_Ddui_Out;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveEssay(response: Response, body: Calc_Ddui_Dto & Calc_Ddui_Out): Promise<Response<any, Record<string, any>>>;
}
