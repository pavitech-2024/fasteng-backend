import { Injectable, Logger } from "@nestjs/common";
import { ConcreteGranulometryRepository } from "modules/concrete/essays/granulometry/repository";
import { UnitMassRepository } from "modules/concrete/essays/unitMass/repository";
import { MaterialsRepository } from "modules/concrete/materials/repository";

@Injectable()
export class MaterialSelection_ABCP_Service {
    private logger = new Logger(MaterialSelection_ABCP_Service.name)

    constructor(
        private readonly material_repository: MaterialsRepository,
        private readonly granulometry_repository: ConcreteGranulometryRepository,
        private readonly unit_mass_repository: UnitMassRepository,
    ) { }

    async getMaterials(userId: string) {
        try {
            this.logger.log(`getting materials from user > [userId]: ${userId}`)
            const materials = await this.material_repository.findByUserId({
                "userId": userId,
            });

            const filteredMaterials = materials.filter(async ({ _id, type }) => {
                return type === 'cement' || (async () => {
                    return (
                        await this.granulometry_repository.findOne({
                            'material._id': _id
                        })
                        &&
                        await this.unit_mass_repository.findOne({
                            'material._id': _id
                        }))
                })
            })

            return filteredMaterials;
        } catch (error) {
            throw error;
        }
    }
}