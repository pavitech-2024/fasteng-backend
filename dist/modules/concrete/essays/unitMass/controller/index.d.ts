import { Response } from 'express';
import { UnitMass_Init_Dto } from '../dto/unitMass-init.dto';
import { UnitMassService } from '../service';
import { UnitMass_Step2_Dto } from '../dto/unitMass-step2.dto';
import { Result_UnitMass_Dto, UnitMass_Result } from '../dto/unitMass-result.dto';
export declare class UnitMassController {
    private readonly UnitMassService;
    private logger;
    constructor(UnitMassService: UnitMassService);
    verifyInitUnitMass(response: Response, body: UnitMass_Init_Dto): Promise<Response<any, Record<string, any>>>;
    verifyStep2DataUnitMass(response: Response, body: UnitMass_Step2_Dto): Promise<Response<any, Record<string, any>>>;
    calculateUnitMass(body: Result_UnitMass_Dto): Promise<{
        success: boolean;
        result: {
            result: number;
        };
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveEssay(response: Response, body: Result_UnitMass_Dto & UnitMass_Result): Promise<Response<any, Record<string, any>>>;
}
