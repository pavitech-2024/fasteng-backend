import { AsphaltGranulometryRepository } from '../../../../../modules/asphalt/essays/granulometry/repository';
import { SpecifyMassRepository } from '../../../../../modules/asphalt/essays/specifyMass/repository';
import { MaterialsRepository } from '../../../../../modules/asphalt/materials/repository';
import { Model } from 'mongoose';
import { SuperpaveDocument } from '../schemas';
import { SuperpaveRepository } from '../repository';
import { ViscosityRotationalRepository } from 'modules/asphalt/essays/viscosityRotational/repository';
export declare class MaterialSelection_Superpave_Service {
    private superpaveModel;
    private readonly material_repository;
    private readonly granulometry_repository;
    private readonly specifyMass_repository;
    private readonly superpaveRepository;
    private readonly rotationalViscosity_repository;
    private logger;
    constructor(superpaveModel: Model<SuperpaveDocument>, material_repository: MaterialsRepository, granulometry_repository: AsphaltGranulometryRepository, specifyMass_repository: SpecifyMassRepository, superpaveRepository: SuperpaveRepository, rotationalViscosity_repository: ViscosityRotationalRepository);
    getMaterials(userId: string): Promise<import("../../../materials/schemas").Material[]>;
    saveMaterials(body: any, userId: string): Promise<boolean>;
}
