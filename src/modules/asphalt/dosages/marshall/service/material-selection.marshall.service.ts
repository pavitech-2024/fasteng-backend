import { Injectable, Logger } from "@nestjs/common";
import { AsphaltGranulometryRepository } from "../../../../../modules/asphalt/essays/granulometry/repository";
import { SpecifyMassRepository } from "../../../../../modules/asphalt/essays/specifyMass/repository";
import { MaterialsRepository } from "../../../../../modules/asphalt/materials/repository";

@Injectable()
export class MaterialSelection_Marshall_Service {
    private logger = new Logger(MaterialSelection_Marshall_Service.name)

    constructor(
        private readonly material_repository: MaterialsRepository,
        private readonly granulometry_repository: AsphaltGranulometryRepository,
        private readonly specifyMass_repository: SpecifyMassRepository,
    ) { }

    async getMaterials(userId: string) {
        try {
            const materials = await this.material_repository.findByUserId({
                "userId": userId,
            });

            
            const granulometrys = await this.granulometry_repository.findAll();
            const specifyMasses = await this.specifyMass_repository.findAll();

            const binders = materials.filter(({ type }) => {
                return type === 'CAP' || type === 'asphaltBinder'
            });

            const aggregates = materials.filter(({ _id, type }) => {
                if (type === 'CAP' || type === 'asphaltBinder') return false
                const granulometry = granulometrys.some(({ generalData }) => { 
                    const { material } = generalData
                    return _id.toString() === material._id.toString()
                });
                const specifyMass = specifyMasses.some(({ generalData }) => { 
                    const { material } = generalData
                    return _id.toString() === material._id.toString()
                });
                return granulometry //&& specifyMass;

            });

            const filteredMaterials = binders.concat(aggregates);

            return filteredMaterials;
        } catch (error) {
            throw error;
        }
    }
}