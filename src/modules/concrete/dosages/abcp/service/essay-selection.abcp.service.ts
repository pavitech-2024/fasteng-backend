import { Injectable, Logger } from "@nestjs/common";
import { MaterialsRepository } from "modules/concrete/materials/repository";
import { ConcreteGranulometryRepository } from "modules/concrete/essays/granulometry/repository";
import { UnitMassRepository } from "modules/concrete/essays/unitMass/repository";
import { ABCPEssaySelectionDto } from "../dto/abcp-essay-selection.dto";

@Injectable()
export class EssaySelection_ABCP_Service {
    private logger = new Logger(EssaySelection_ABCP_Service.name)

    constructor(
        private readonly material_repository: MaterialsRepository,
        private readonly granulometry_repository: ConcreteGranulometryRepository,
        private readonly unit_mass_repository: UnitMassRepository,
    ) { }

    async getEssays({ cements, coarseAggregates, fineAggregates }: ABCPEssaySelectionDto) {
        try {

            // this.logger.log(cements)
            // this.logger.log(coarseAggregates)
            // this.logger.log(fineAggregates)

            const cements_essays = cements.map((_id) => {
                return {
                    _id: _id,
                    specific_mass: null
                }
            });
            
            const granulometrys = await this.granulometry_repository.findAll();
            const unit_masses = await this.unit_mass_repository.findAll();

            const coarseAggregates_essays = coarseAggregates.map((_id) => {
                const granulometry_esssays = granulometrys.filter((essay)=>(
                    essay.generalData.material._id.toString() === _id.toString()
                ));
                const unit_mass_essays = unit_masses.filter((essay)=>(
                    essay.generalData.material._id.toString() === _id.toString()
                ));
                return {
                    _id,
                    specific_mass: null,
                    granulometrys: granulometry_esssays,
                    unit_masses: unit_mass_essays,
                }
            })

            const fineAggregates_essays = fineAggregates.map((_id) => {
                const granulometry_esssays = granulometrys.filter((essay)=>(
                    essay.generalData.material._id.toString() === _id.toString()
                ));
                return {
                    _id,
                    specific_mass: null,
                    granulometrys: granulometry_esssays,
                }
            })

            return {
                cements: cements_essays,
                coarseAggregates: coarseAggregates_essays,
                fineAggregates: fineAggregates_essays,
            };
        } catch (error) {
            throw error
        }
    }
}

