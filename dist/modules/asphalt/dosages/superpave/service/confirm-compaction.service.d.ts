import { Model } from "mongoose";
import { SuperpaveRepository } from "../repository";
import { SuperpaveDocument } from "../schemas";
export declare class ConfirmCompaction_Superpave_Service {
    private superpaveModel;
    private readonly superpaveRepository;
    private logger;
    constructor(superpaveModel: Model<SuperpaveDocument>, superpaveRepository: SuperpaveRepository);
    saveConfirmattionCompressionData(body: any, userId: string): Promise<boolean>;
}
