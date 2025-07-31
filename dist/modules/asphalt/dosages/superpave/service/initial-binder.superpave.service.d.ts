import { SpecifyMassRepository } from 'modules/asphalt/essays/specifyMass/repository';
import { SuperpaveRepository } from '../repository';
import { Model } from 'mongoose';
import { SuperpaveDocument } from '../schemas';
export declare class InitialBinder_Superpave_Service {
    private superpaveModel;
    private readonly specificMassRepository;
    private readonly superpave_repository;
    private logger;
    constructor(superpaveModel: Model<SuperpaveDocument>, specificMassRepository: SpecifyMassRepository, superpave_repository: SuperpaveRepository);
    getFirstCompressionSpecificMasses(body: any): Promise<{
        specificMasses: any[];
    }>;
    calculateStep5Data(body: any): Promise<{
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
            curve: string;
        }[];
        turnNumber: {
            initialN: number;
            projectN: number;
            maxN: number;
            tex: string;
        };
    }>;
    calculateDenominatorGsa_Gsb(listOfSpecificMasses: {
        bulk: string;
        apparent: string;
    }[], percentsOfDosage: Record<string, string>[]): {
        denominatorGsb: number;
        denominatorGsa: number;
    };
    saveInitialBinderStep(body: any, userId: string): Promise<boolean>;
}
