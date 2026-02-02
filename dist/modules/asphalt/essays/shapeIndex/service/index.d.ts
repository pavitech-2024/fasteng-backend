import { ShapeIndexInitDto } from '../dto/shapeIndex-init.dto';
import { Calc_SHAPEINDEX_Dto, Calc_SHAPEINDEX_Out } from '../dto/calc.shapeIndex.dto';
import { ShapeIndexRepository } from '../repository';
import { Calc_SHAPEINDEX_Service } from './calc.shapeIndex.service';
import { GeneralData_SHAPEINDEX_Service } from './general-data.shapeIndex.service';
export declare class ShapeIndexService {
    private readonly generalData_Service;
    private readonly calc_Service;
    private readonly ShapeIndex_Repository;
    private logger;
    constructor(generalData_Service: GeneralData_SHAPEINDEX_Service, calc_Service: Calc_SHAPEINDEX_Service, ShapeIndex_Repository: ShapeIndexRepository);
    verifyInitShapeIndex(body: ShapeIndexInitDto): Promise<{
        result: boolean;
        error?: undefined;
    } | {
        result: {
            success: boolean;
        };
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    calculateShapeIndex(body: Calc_SHAPEINDEX_Dto): Promise<{
        success: boolean;
        result: Calc_SHAPEINDEX_Out;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveEssay(body: Calc_SHAPEINDEX_Dto & Calc_SHAPEINDEX_Out): Promise<{
        success: boolean;
        data: import("../schemas").ShapeIndex;
        error?: undefined;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
        data?: undefined;
    }>;
}
