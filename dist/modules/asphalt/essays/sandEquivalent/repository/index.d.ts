import { Model } from "mongoose";
import { SandEquivalent, SandEquivalentDocument } from "../schemas";
export declare class SandEquivalentRepository {
    private sandEquivalentModel;
    constructor(sandEquivalentModel: Model<SandEquivalentDocument>);
    findOne(sandEquivalentFilterQuery: any): Promise<SandEquivalent>;
    findAll(): Promise<SandEquivalent[]>;
    create(sandEquivalent: any): Promise<SandEquivalent>;
}
