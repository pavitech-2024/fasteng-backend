import { Model } from "mongoose";
import { Ddui, DduiDocument } from "../schemas";
export declare class DduiRepository {
    private dduiModel;
    constructor(dduiModel: Model<DduiDocument>);
    findOne(dduiFilterQuery: any): Promise<Ddui>;
    findAll(): Promise<Ddui[]>;
    create(ddui: any): Promise<Ddui>;
    findAllByUserId(id: string): Promise<Ddui[]>;
}
