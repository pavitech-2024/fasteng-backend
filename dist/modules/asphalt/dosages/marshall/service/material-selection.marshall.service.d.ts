import { AsphaltGranulometryRepository } from '../../../../../modules/asphalt/essays/granulometry/repository';
import { MaterialsRepository } from '../../../../../modules/asphalt/materials/repository';
import { Model } from 'mongoose';
import { MarshallRepository } from '../repository';
import { MarshallDocument } from '../schemas';
import { ViscosityRotationalRepository } from '../../../essays/viscosityRotational/repository';
import { SpecifyMassRepository } from '../../../essays/specifyMass/repository/index';
export declare class MaterialSelection_Marshall_Service {
    private marshallModel;
    private readonly material_repository;
    private readonly granulometry_repository;
    private readonly marshallRepository;
    private readonly rotationalViscosity_repository;
    private readonly specificMass_repository;
    private logger;
    constructor(marshallModel: Model<MarshallDocument>, material_repository: MaterialsRepository, granulometry_repository: AsphaltGranulometryRepository, marshallRepository: MarshallRepository, rotationalViscosity_repository: ViscosityRotationalRepository, specificMass_repository: SpecifyMassRepository);
    getMaterials(userId: string): Promise<import("../../../materials/schemas").Material[]>;
    saveMaterials(body: any, userId: string): Promise<boolean>;
}
