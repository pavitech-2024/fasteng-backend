import { Injectable, Logger } from "@nestjs/common";
import { MaterialsRepository } from "../../../../../../src/modules/concrete/materials/repository";
import { ConcreteGranulometryRepository } from "../../../../../modules/concrete/essays/granulometry/repository";
import { UnitMassRepository } from "../../../../../modules/concrete/essays/unitMass/repository";
import { ABCPEssaySelectionDto } from "../dto/abcp-essay-selection.dto";

@Injectable()
export class EssaySelection_ABCP_Service {
    private logger = new Logger(EssaySelection_ABCP_Service.name)

    constructor(
        private readonly material_repository: MaterialsRepository,
        private readonly granulometry_repository: ConcreteGranulometryRepository,
        private readonly unit_mass_repository: UnitMassRepository,
    ) { }

    async getEssays({ cement_id, coarseAggregate_id, fineAggregate_id }: ABCPEssaySelectionDto) {
        try {

            const materials = await this.material_repository.find();

            const cement = materials.find((material) => {
                const { name } = material;
                if (material._id.toString() === cement_id.toString()) {
                    return {
                        cement_id,
                        name,
                    }
                }
            });

            const coarseGranulometrys = await this.granulometry_repository.findAllGranulometrysByMaterialId( coarseAggregate_id, 'coarse' );
            const fineGranulometrys = await this.granulometry_repository.findAllGranulometrysByMaterialId( fineAggregate_id, 'fine' );
            const unit_masses = await this.unit_mass_repository.findAllUnitMassesByMaterialId( coarseAggregate_id );

            const coarseAggregates = materials
            .filter((material) => coarseAggregate_id.toString() === material._id.toString())
            .map((material) => {
                const granulometry_esssays = coarseGranulometrys.filter((essay) => (
                essay.generalData.material._id.toString() === material._id.toString()
                ));
                const unit_mass_essays = unit_masses.filter((essay) => (
                essay.generalData.material._id.toString() === material._id.toString()
                ));

                return {
                _id: material._id,
                name: material.name,
                granulometrys: granulometry_esssays,
                unit_masses: unit_mass_essays,
                };
            });

            const coarseAggregate = coarseAggregates.length > 0 ? coarseAggregates[0] : null;


            const fineAggregates = materials
                .filter((material) => fineAggregate_id.toString() === material._id.toString())
                .map((material) => {
                    const granulometry_esssays = fineGranulometrys.filter((essay) => (
                        essay.generalData.material._id.toString() === material._id.toString()
                    ));
                    
                return {
                    _id: material._id,
                    name: material.name,
                    granulometrys: granulometry_esssays,
                }
            });

            const fineAggregate = fineAggregates.length > 0 ? fineAggregates[0] : null;

            return {
                cement,
                coarseAggregate,
                fineAggregate,
            };
        } catch (error) {
            throw error
        }
    }
}

