import { Model } from "mongoose";
import { Abrasion, AbrasionDocument } from "../schemas";
export declare class AbrasionRepository {
    private abrasionModel;
    constructor(abrasionModel: Model<AbrasionDocument>);
    findOne(abrasionFilterQuery: any): Promise<Abrasion>;
    findAll(): Promise<Abrasion[]>;
    create(abrasion: any): Promise<Abrasion>;
}
