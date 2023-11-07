import { Injectable, Logger } from '@nestjs/common';
import { Calc_DUCTILITY_Dto, Calc_DUCTILITY_Out } from '../dto/calc.ductility.dto';
import { DuctilityRepository } from '../repository';
import { MaterialsRepository } from '../../../../../modules/asphalt/materials/repository';

@Injectable()
export class Calc_DUCTILITY_Service {
    private logger = new Logger(Calc_DUCTILITY_Service.name);

    constructor(private readonly ductilityRepository: DuctilityRepository, private readonly materialRepository: MaterialsRepository) { }

    async calculateDuctility({ step2Data }: Calc_DUCTILITY_Dto): Promise<{ success: boolean; result: Calc_DUCTILITY_Out }> {
        try {
            this.logger.log('calculate ductility on calc.ductility.service.ts > [body]');

            const { first_rupture_length, second_rupture_length, third_rupture_length } = step2Data;

            const ruptures : number[] = [];

            if (first_rupture_length) {
                ruptures.push(first_rupture_length)
            }
            if (second_rupture_length) {
                ruptures.push(second_rupture_length)
            }
            if (third_rupture_length) {
                ruptures.push(third_rupture_length)
            }

            this.logger.debug(ruptures)

            let sum = ruptures.reduce((sum, length) => (sum += length));

            this.logger.debug(sum);
            

            const result_rupture_length = sum / ruptures.length;

            if (Number.isNaN(result_rupture_length)) {
                return {
                    success: false,
                    result: null
                };
            }

            return {
                success: true,
                result: {
                    ductility: result_rupture_length,
                }
            };
        } catch (error) {
            return {
                success: false,
                result: null
            };
        }
    }
}