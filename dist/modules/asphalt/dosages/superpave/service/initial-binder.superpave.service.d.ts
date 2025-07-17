import { SuperpaveRepository } from '../repository';
import { GeneralData_Superpave_Service } from './general-data.superpave.service';
import { GranulometryComposition_Superpave_Service } from './granulometry-composition.superpave.service';
import { MaterialSelection_Superpave_Service } from './material-selection.superpave.service';
import { MaterialsRepository } from 'modules/asphalt/materials/repository';
import { SpecifyMassRepository } from 'modules/asphalt/essays/specifyMass/repository';
export declare class InitialBinder_Superpave_Service {
    private readonly superpave_repository;
    private readonly generalData_Service;
    private readonly materialSelection_Service;
    private readonly granulometryComposition_Service;
    private readonly asphaltMaterialRepository;
    private readonly specificMassRepository;
    private logger;
    constructor(superpave_repository: SuperpaveRepository, generalData_Service: GeneralData_Superpave_Service, materialSelection_Service: MaterialSelection_Superpave_Service, granulometryComposition_Service: GranulometryComposition_Superpave_Service, asphaltMaterialRepository: MaterialsRepository, specificMassRepository: SpecifyMassRepository);
    getStep4SpecificMasses(body: any): Promise<{
        specificMasses: any[];
    }>;
    getStep4Data(body: any): Promise<{
        granulometryComposition: {
            combinedGsb: number;
            combinedGsa: number;
            gse: number;
            vla: number;
            tmn: number;
            vle: number;
            mag: number;
            pli: number;
            percentsOfDosageWithBinder: number[];
        }[];
        turnNumber: {
            initialN: number;
            projectN: number;
            maxN: number;
            tex: string;
        };
    }>;
    calculateDenominatorGsa_Gsb(listOfSpecificMasses: any, percentsOfDosage: any): {
        denominatorGsb: number;
        denominatorGsa: number;
    };
}
