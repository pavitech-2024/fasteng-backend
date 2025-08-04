/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { HydratedDocument } from 'mongoose';
import { Material } from '../../../materials/schemas';
import { Calc_ELONGATEDPARTICLES_Out } from '../dto/calc.elongatedParticles.dto';
export type ElongatedParticlesDocument = HydratedDocument<ElongatedParticles>;
export type ElongatedParticlesGeneralData = {
    userId: string;
    name: string;
    material: Material;
    createdAt: Date;
    operator?: string;
    calculist?: string;
    description?: string;
};
export type ElongatedParticlesDimensionsRow = {
    ratio: string;
    sample_mass: number;
    mass: number;
};
export type ElongatedParticlesResultsDimensionsRow = {
    ratio: string;
    particles_percentage: number;
};
type ElongatedParticles_step2Data = {
    dimensions_table_data: ElongatedParticlesDimensionsRow[];
};
export declare class ElongatedParticles {
    _id: string;
    generalData: ElongatedParticlesGeneralData;
    step2Data: ElongatedParticles_step2Data;
    results: {
        data: Calc_ELONGATEDPARTICLES_Out;
    };
}
export declare const ElongatedParticlesSchema: import("mongoose").Schema<ElongatedParticles, import("mongoose").Model<ElongatedParticles, any, any, any, import("mongoose").Document<unknown, any, ElongatedParticles> & ElongatedParticles & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ElongatedParticles, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<ElongatedParticles>> & import("mongoose").FlatRecord<ElongatedParticles> & Required<{
    _id: string;
}>>;
export {};
