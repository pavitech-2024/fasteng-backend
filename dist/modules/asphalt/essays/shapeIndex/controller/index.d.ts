import { Response } from 'express';
import { ShapeIndexService } from "../service";
import { Calc_SHAPEINDEX_Dto, Calc_SHAPEINDEX_Out } from "../dto/calc.shapeIndex.dto";
import { ShapeIndexInitDto } from "../dto/shapeIndex-init.dto";
export declare class ShapeIndexController {
    private readonly shapeIndexService;
    private logger;
    constructor(shapeIndexService: ShapeIndexService);
    verifyInitShapeIndex(response: Response, body: ShapeIndexInitDto): Promise<Response<any, Record<string, any>>>;
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
    saveEssay(response: Response, body: Calc_SHAPEINDEX_Dto & Calc_SHAPEINDEX_Out): Promise<Response<any, Record<string, any>>>;
}
