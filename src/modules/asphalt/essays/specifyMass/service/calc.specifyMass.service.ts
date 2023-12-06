import { Injectable, Logger } from '@nestjs/common';
import { Calc_SPECIFYMASS_Dto, Calc_SPECIFYMASS_Out } from '../dto/calc.specifyMass.dto';
import { SpecifyMassRepository } from '../repository';
import { MaterialsRepository } from '../../../../../modules/asphalt/materials/repository';

@Injectable()
export class Calc_SPECIFYMASS_Service {
    private logger = new Logger(Calc_SPECIFYMASS_Service.name);

    constructor(private readonly specifymassRepository: SpecifyMassRepository, private readonly materialRepository: MaterialsRepository) { }

    async calculateSpecifyMass({ step2Data }: Calc_SPECIFYMASS_Dto): Promise<{ success: boolean; result: Calc_SPECIFYMASS_Out }> {
        try {
            this.logger.log('calculate specifymass on calc.specifyMass.service.ts > [body]');

            const { dry_mass, submerged_mass, surface_saturated_mass } = step2Data;

            const bulk_specify_mass = Math.round( 100 * (this.calculatingbulkSpecificGravity(dry_mass, submerged_mass))) / 100;
            const apparent_specify_mass = Math.round( 100 * (this.calculatingApparentSpecificGravity(dry_mass, submerged_mass, surface_saturated_mass))) / 100;
            const absorption = Math.round( 100 * (this.calculatingAbsoption(dry_mass, surface_saturated_mass))) / 100;

            this.logger.log(bulk_specify_mass)
            this.logger.log(apparent_specify_mass)
            this.logger.log(absorption)
            
            return {
                success: true,
                result: {
                    bulk_specify_mass,
                    apparent_specify_mass,
                    absorption,
                }
            };
        } catch (error) {
            return {
                success: false,
                result: null
            };
        }
    }

    calculatingbulkSpecificGravity = (dry_mass: number, submerged_mass: number) => {
        return (0.9971 * (dry_mass /
            (dry_mass - submerged_mass)));
    }

    calculatingApparentSpecificGravity = (dry_mass: number, submerged_mass: number, saturated_mass: number) => {
        return (0.9975 * (dry_mass /
            (saturated_mass - submerged_mass)));
    }
    
    calculatingAbsoption = (dry_mass: number, saturated_mass: number) => {
        return (((saturated_mass - dry_mass)
            / dry_mass) * 100);
    }
}