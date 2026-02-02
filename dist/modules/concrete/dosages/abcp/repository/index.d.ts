import { Model } from "mongoose";
import { ABCP, ABCPDocument } from "../schemas";
export declare class ABCPRepository {
    private abcpModel;
    constructor(abcpModel: Model<ABCPDocument>);
    find(): Promise<ABCP[]>;
    findById(dosageId: string): Promise<ABCP>;
    findOne(name: any, userId: string): Promise<ABCP>;
    create(abcp: any): Promise<ABCP>;
    createPartialAbcp(abcp: any, userId: string): Promise<any>;
    updatePartialAbcp(abcp: any, userId: string): Promise<any>;
    saveStep(abcp: any, step: number): Promise<void>;
    findOneAndDelete(dosage_id: any): Promise<any>;
}
