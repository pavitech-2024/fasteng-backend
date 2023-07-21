import { Injectable, Logger } from '@nestjs/common';
import { Calc_SUCS_Dto, Calc_SUCS_Out } from '../dto/calc.sucs.dto';
import sucs_classifications, { Sucs_Classification } from '../utils/sucs-classifications';
import { sieves } from 'modules/soils/util/ListSieves';
import { SucsRepository } from '../repository';
import { SamplesRepository } from 'modules/soils/samples/repository';

@Injectable()
export class Calc_SUCS_Service {
    private logger = new Logger(Calc_SUCS_Service.name);

    constructor(private readonly sucsRepository: SucsRepository, private readonly sampleRepository: SamplesRepository) {}

    async calculateSucs ({ step2Data }: Calc_SUCS_Dto): Promise<{ success: boolean; result: Calc_SUCS_Out }> {
        try {
            this.logger.log('calculate sucs on calc.sucs.service.ts > [body]');

            const classifications: Sucs_Classification[] = sucs_classifications;
            const { tableData, liquidity_limit, plasticity_limit, organic_matter } = step2Data;

            const plasticity_index = liquidity_limit - plasticity_limit;

            const plasticity_index_greater_ref = plasticity_index > (0.73 * (liquidity_limit - 20));

            const cnu = this.calculateCNU(tableData);

            const cc = 0;        

            const sucs_classification = classifications.find((classification) => ['sieve4', 'sieve200', 'liquidity_limit', 'organic_matter', 'plasticity_index_greater_ref', 'cnu', 'cc'].every(
                (field, ranges) => classification.validateParams ( 
                    field, 
                    {
                        sieve4: tableData[0].passant,
                        sieve200: tableData[1].passant,
                        liquidity_limit: liquidity_limit as number,
                        organic_matter,
                        plasticity_index_greater_ref,
                        cnu, 
                        cc
                    }, 
                    ranges
                ),
            ));

            const classification = sucs_classification.code;

            return {
                success: true,
                result: {
                    cc,
                    cnu,
                    plasticity_index,
                    classification,
                }
            };
        } catch (error) {
            return {
                success: false,
                result: null
            };
        }
    }

    calculateCNU = (granulometry_passant) => {
        const diameter10 = this.getDiameter(sieves, 10, this.getPercentage(10, granulometry_passant));
        const diameter60 = this.getDiameter(sieves, 60, this.getPercentage(60, granulometry_passant));
        return diameter60 / diameter10;
    }

    calculateCC = (granulometry_passant) => {
        const diameter10 = this.getDiameter(sieves, 10, this.getPercentage(10, granulometry_passant));
        const diameter30 = this.getDiameter(sieves, 30, this.getPercentage(30, granulometry_passant));
        const diameter60 = this.getDiameter(sieves, 60, this.getPercentage(60, granulometry_passant));
    
        return Math.pow(diameter30, 2) / (diameter60 * diameter10);
    }

    getDiameter = (list_sieves, percentage, limits) => {
        if (limits.upperLimit.value === percentage) return list_sieves[limits.upperLimit.index];
        if (limits.inferiorLimit.value === percentage) return list_sieves[limits.inferiorLimit.index];
    
        const coefficientA =
            (limits.upperLimit.value - limits.inferiorLimit.value) /
            (list_sieves[limits.upperLimit.index] - list_sieves[limits.inferiorLimit.index]);
        const coefficientB = limits.upperLimit.value / (coefficientA * list_sieves[limits.upperLimit.index]);
    
        return (percentage - coefficientB) / coefficientA;
    }

    getPercentage = (percentage, granulometry_passant) => {
        return granulometry_passant.reduce(
            (accumulate, sieve, index) => {
                const { upperLimit, inferiorLimit } = accumulate;
    
                if (sieve.passant >= percentage) {
                    if (upperLimit.value === 0 || sieve.passant < upperLimit.value)
                        accumulate.upperLimit = {
                            value: sieve.passant,
                            index: index
                        };
                } else {
                    if (inferiorLimit.value === 0 || sieve.passant > inferiorLimit.value)
                        accumulate.inferiorLimit = {
                            value: sieve.passant,
                            index: index
                        };
                }
                return accumulate;
            },
            {
                upperLimit: {
                    value: 0,
                    index: 0
                },
                inferiorLimit: {
                    value: 0,
                    index: 0
                }
            }
        );
    }

}