import { Calc_SofteningPoint_Dto, Calc_SofteningPoint_Out } from "../dto/calc-softeningPoint.dto";
import { MaterialsService } from "../../../../../modules/asphalt/materials/service";
export declare class Calc_SofteningPoint_Service {
    private materialsService;
    constructor(materialsService: MaterialsService);
    private logger;
    calculateSofteningPoint({ softeningPoint, generalData }: Calc_SofteningPoint_Dto): Promise<{
        success: boolean;
        result: Calc_SofteningPoint_Out;
    }>;
    private verifyResult;
    private verifyResultForAmp;
    private verifyResultForCap;
}
