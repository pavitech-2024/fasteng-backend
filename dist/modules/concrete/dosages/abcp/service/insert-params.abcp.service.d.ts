import { ABCPRepository } from "../repository";
import { InsertParamsDataDto } from "../dto/save-insert-params.dto";
import { Model } from "mongoose";
import { ABCPDocument } from "../schemas";
export declare class InsertParams_ABCP_Service {
    private abcpModel;
    private readonly abcpRepository;
    private logger;
    constructor(abcpModel: Model<ABCPDocument>, abcpRepository: ABCPRepository);
    saveInsertParams(body: InsertParamsDataDto, userId: string): Promise<boolean>;
}
