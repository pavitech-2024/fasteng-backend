import { MaterialsRepository } from '../../../materials/repository';
import { AbrasionRepository } from "../repository";
import { Calc_Abrasion_Dto, Calc_Abrasion_Out } from "../dto/calc-abrasion.dto";
export declare class Calc_Abrasion_Service {
    private readonly abrasionRepository;
    private readonly materialRepository;
    private logger;
    constructor(abrasionRepository: AbrasionRepository, materialRepository: MaterialsRepository);
    calculateAbrasion(calcAbrasionDto: Calc_Abrasion_Dto): Promise<{
        success: boolean;
        result: Calc_Abrasion_Out;
    }>;
    private calculateLosAngelesAbrasion;
    private verifyResult;
}
