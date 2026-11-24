import { Model } from 'mongoose';
import { MarshallRepository } from '../repository/index';
import { Marshall, MarshallDocument } from '../schemas';
import { MarshallInitDto } from '../dto/marshall-init.dto';
export declare class GeneralData_Marshall_Service {
    private readonly marshallModel;
    private readonly marshallRepository;
    private readonly logger;
    constructor(marshallModel: Model<MarshallDocument>, marshallRepository: MarshallRepository);
    verifyInitMarshall(marshall: MarshallInitDto, userId: string): Promise<{
        success: boolean;
        dosage: import("mongoose").Document<unknown, {}, Marshall> & Marshall & Required<{
            _id: string;
        }>;
    }>;
    getDosageById(dosageId: string): Promise<import("mongoose").Document<unknown, {}, Marshall> & Marshall & Required<{
        _id: string;
    }>>;
    saveMarshallDosage(body: any, userId: string): Promise<boolean>;
    deleteMarshallDosage(id: string): Promise<boolean>;
}
