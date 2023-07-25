import { Injectable, Logger } from '@nestjs/common';
import { Calc_GRANULOMETRY_Dto, Calc_GRANULOMETRY_Out } from '../dto/calc.granulometry.dto';
import { GranulometryRepository } from '../repository';
import { SamplesRepository } from 'modules/soils/samples/repository';
import { sieves } from 'modules/soils/util/ListSieves';

@Injectable()
export class Calc_GRANULOMETRY_Service {
    private logger = new Logger(Calc_GRANULOMETRY_Service.name);

    constructor(private readonly granulometryRepository: GranulometryRepository, private readonly sampleRepository: SamplesRepository) {}

    async calculateGranulometry ({ step2Data }: Calc_GRANULOMETRY_Dto): Promise <{ success: boolean; result: Calc_GRANULOMETRY_Out}> {
        try {
            this.logger.log('calculate granulometry on calc.granulometry.service.ts > [body]');

            const { passant_percentage, sample_mass, bottom } = step2Data;

            // Isso tá horrível. Copiado e colado do back atual com algumas modificações

            let percentage_retained = [];
            let diameters_graph = [];
            let passants_graph = [];
            let retained_accumulated_list = [];

            let total_retained = 0;
            
            let last_index = true;

            for (let i = 0; i < 3; i++) {
                if (passant_percentage[i] !== null) {
                    total_retained += sample_mass - ((passant_percentage[i].passant * sample_mass) / 100);
                    retained_accumulated_list[i] = total_retained;
                    passants_graph.push(passant_percentage[i].passant);
                    if (i === 0) {
                        diameters_graph.push(sieves[12]);
                    } else if (i === 1) {
                        diameters_graph.push(sieves[15]);
                    } else {
                        diameters_graph.push(sieves[18]);
                    }
                    last_index = false;
                } else if (last_index) percentage_retained[i] = null;
            }
    
            const error = (sample_mass - total_retained + bottom) * 100 / sample_mass;

        } catch (error) {
            return {
                success: false,
                result: null
            };
        }
    }
}