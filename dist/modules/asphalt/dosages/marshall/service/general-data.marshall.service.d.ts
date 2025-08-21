import { MarshallRepository } from '../repository';
import { Model } from "mongoose";
import { Marshall, MarshallDocument } from "../schemas";
import { MarshallGeneralDataDTO } from "../dto/marshal-general-data.dto";
export declare class GeneralData_Marshall_Service {
    private readonly marshallModel;
    private readonly marshallRepository;
    private logger;
    constructor(marshallModel: Model<MarshallDocument>, marshallRepository: MarshallRepository);
    verifyInitMarshall(marshall: MarshallGeneralDataDTO, userId: string): Promise<{
        success: boolean;
        dosage: Marshall;
    }>;
    getDosageById(dosageId: string): Promise<MarshallDocument>;
    saveMarshallDosage(body: Partial<Marshall> & {
        isConsult?: boolean;
    }, userId: string): Promise<boolean>;
    deleteMarshallDosage(id: string): Promise<boolean>;
}
