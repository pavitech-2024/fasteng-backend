import { Calc_ANGULARITY_Dto, Calc_ANGULARITY_Out } from '../dto/calc.angularity.dto';
import { AngularityRepository } from '../repository';
import { MaterialsRepository } from '../../../../../modules/asphalt/materials/repository';
import { row_step2 } from '../schemas';
export declare class Calc_ANGULARITY_Service {
    private readonly angularityRepository;
    private readonly materialRepository;
    private logger;
    constructor(angularityRepository: AngularityRepository, materialRepository: MaterialsRepository);
    calculateAngularity({ step2Data }: Calc_ANGULARITY_Dto): Promise<{
        success: boolean;
        result: Calc_ANGULARITY_Out;
    }>;
    calculateMethod: (relativeDensity: number, cylinderVolume: number, method: string, determinations: row_step2[]) => {
        angularities: {
            label: string;
            angularity: number;
        }[];
        averageOfAll: number;
        porcentagesOfVoids: number[];
        alerts: string[];
    };
}
