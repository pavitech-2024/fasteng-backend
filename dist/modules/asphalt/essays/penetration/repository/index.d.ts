import { Model } from "mongoose";
import { Penetration, PenetrationDocument } from "../schemas";
export declare class PenetrationRepository {
    private penetrationModel;
    constructor(penetrationModel: Model<PenetrationDocument>);
    findOne(penetrationFilterQuery: any): Promise<Penetration>;
    findAll(): Promise<Penetration[]>;
    create(penetration: any): Promise<Penetration>;
}
