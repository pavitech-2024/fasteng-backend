import { Response } from 'express';
import { SandIncreaseService } from '../service';
import { Calc_MoistureContentDto, Calc_SandIncrease_Dto, Calc_SandIncrease_Out, Calc_UnitMassDto, Save_SandIncreaseDto } from '../dto/calc.sand-increase.dto';
import { SandIncreaseInitDto } from '../dto/sand-increase-init.dto';
export declare class SandIncreaseController {
    private readonly sandIncreaseService;
    private logger;
    constructor(sandIncreaseService: SandIncreaseService);
    verifyInitSandIncrease(response: Response, body: SandIncreaseInitDto): Promise<Response<any, Record<string, any>>>;
    calculateUnitMass(body: Calc_UnitMassDto): Promise<{
        success: boolean;
        result: number[];
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    calculateMoistureContent(body: Calc_MoistureContentDto): Promise<{
        success: boolean;
        result: number[];
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    calculateSandIncrease(body: Calc_SandIncrease_Dto): Promise<{
        success: boolean;
        result: Calc_SandIncrease_Out;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveEssay(response: Response, body: Save_SandIncreaseDto): Promise<Response<any, Record<string, any>>>;
}
