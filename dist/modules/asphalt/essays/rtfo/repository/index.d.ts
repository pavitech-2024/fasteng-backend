import { Model } from "mongoose";
import { Rtfo, RtfoDocument } from "../schemas";
export declare class RtfoRepository {
    private rtfoModel;
    constructor(rtfoModel: Model<RtfoDocument>);
    findOne(rtfoFilterQuery: any): Promise<Rtfo>;
    findAll(): Promise<Rtfo[]>;
    create(rtfo: any): Promise<Rtfo>;
}
