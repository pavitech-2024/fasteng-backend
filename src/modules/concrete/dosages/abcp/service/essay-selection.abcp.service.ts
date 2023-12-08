import { Injectable, Logger } from "@nestjs/common";
import { MaterialsRepository } from "modules/concrete/materials/repository";
import { ConcreteGranulometryRepository } from "modules/concrete/essays/granulometry/repository";
import { UnitMassRepository } from "modules/concrete/essays/unitMass/repository";
import { ABCPEssaySelectionDto } from "../dto/abcp-essay-selection.dto";
import { Granulometry } from '../../../../soils/essays/granulometry/schemas/index';

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

            const granulometrys = await this.granulometry_repository.findAllByMaterialId( coarseAggregate_id );
            const unit_masses = await this.unit_mass_repository.findAll();

            const coarseAggregate = materials.find((material) => {
                const { _id, name } = material;

                if (coarseAggregate_id.toString() === _id.toString()) {
                    const granulometry_esssays = granulometrys.filter((essay) => (
                        essay.generalData.material._id.toString() === _id.toString()
                    ));
                    const unit_mass_essays = unit_masses.filter((essay) => (
                        essay.generalData.material._id.toString() === _id.toString()
                    ));
                    return {
                        _id,
                        name,
                        granulometrys: granulometry_esssays,
                        unit_masses: unit_mass_essays,
                    }
                }
            })

            const fineAggregate = materials.find((material) => {
                const { _id, name } = material;

                if (fineAggregate_id.toString() === _id.toString()) {
                    const granulometry_esssays = granulometrys.filter((essay) => (
                        essay.generalData.material._id.toString() === _id.toString()
                    ));
                    const unit_mass_essays = unit_masses.filter((essay) => (
                        essay.generalData.material._id.toString() === _id.toString()
                    ));
                    return {
                        _id,
                        name,
                        granulometrys: granulometry_esssays,
                        unit_masses: unit_mass_essays,
                    }
                }
            })

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

