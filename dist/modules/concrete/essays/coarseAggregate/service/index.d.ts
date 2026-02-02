import { CoarseAggregateSpecificMassRepository } from "../repository";
import { GeneralData_CoarseAggregate_Service } from "./general-data.coarseAggregate.service";
export declare class CoarseAggregateService {
    private readonly generalData_Service;
    private readonly coarseAggregateRepository;
    constructor(generalData_Service: GeneralData_CoarseAggregate_Service, coarseAggregateRepository: CoarseAggregateSpecificMassRepository);
    verifyInitCoarseAggregate(body: any): Promise<{
        success: boolean;
        error?: undefined;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveEssay(body: any): Promise<{
        success: boolean;
        data: import("../schemas").CoarseAggregateSpecificMass;
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
