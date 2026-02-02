import { ElongatedParticles, ElongatedParticlesDocument } from '../schemas';
import { Model } from 'mongoose';
export declare class ElongatedParticlesRepository {
    private elongatedParticlesModel;
    private logger;
    constructor(elongatedParticlesModel: Model<ElongatedParticlesDocument>);
    findOne(elongatedParticlesFilterQuery: any): Promise<ElongatedParticles>;
    findAll(): Promise<ElongatedParticles[]>;
    create(elongatedParticles: any): Promise<ElongatedParticles>;
}
