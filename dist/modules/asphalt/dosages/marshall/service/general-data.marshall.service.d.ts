import { MarshallRepository } from '../repository/index';
import { Model } from "mongoose";
import { Marshall, MarshallDocument } from "../schemas";
export declare class GeneralData_Marshall_Service {
    private marshallModel;
    private readonly marshallRepository;
    private logger;
    constructor(marshallModel: Model<MarshallDocument>, marshallRepository: MarshallRepository);
    verifyInitMarshall(marshall: any, userId: string): Promise<{
        success: boolean;
        dosage: any;
    }>;
    getDosageById(dosageId: string): Promise<Marshall>;
    saveMarshallDosage(body: any, userId: string): Promise<boolean>;
    deleteMarshallDosage(id: string): Promise<boolean>;
}
