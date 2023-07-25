import { Injectable, Logger } from '@nestjs/common';
import { Calc_SUCS_Dto, Calc_SUCS_Out } from '../dto/calc.sucs.dto';
import sucs_classifications, { Sucs_Classification } from '../utils/sucs-classifications';
import { SucsRepository } from '../repository';
import { SamplesRepository } from 'modules/soils/samples/repository';

type limit = {value: number, index: number};

@Injectable()
export class Calc_SUCS_Service {
    private logger = new Logger(Calc_SUCS_Service.name);

    constructor(private readonly sucsRepository: SucsRepository, private readonly sampleRepository: SamplesRepository) {}

    async calculateSucs ({ step2Data }: Calc_SUCS_Dto): Promise<{ success: boolean; result: Calc_SUCS_Out }> {
        try {
            this.logger.log('calculate sucs on calc.sucs.service.ts > [body]');

            const classifications: Sucs_Classification[] = sucs_classifications;
            const { sieves, liquidity_limit, plasticity_limit, organic_matter } = step2Data;

            const plasticity_index = liquidity_limit - plasticity_limit;

            const plasticity_index_greater_ref = plasticity_index > (0.73 * (liquidity_limit - 20));

            const limit_10 = this.getPercentage(10, sieves);
            const limit_30 = this.getPercentage(30, sieves);
            const limit_60 = this.getPercentage(60, sieves);

            const diameter10 = this.getDiameter(sieves, 10, limit_10);
            const diameter30 = this.getDiameter(sieves, 30, limit_30);
            const diameter60 = this.getDiameter(sieves, 60, limit_60);

            const cnu = diameter60 / diameter10;

            const cc = Math.pow(diameter30, 2) / (diameter60 * diameter10);        

            const sucs_classification = classifications.find((classification) => ['sieve4', 'sieve200', 'liquidity_limit', 'organic_matter', 'plasticity_index_greater_ref', 'cnu', 'cc'].every(
                (field, ranges) => classification.validateParams ( 
                    field, 
                    {
                        sieve4: sieves[0].passant,
                        sieve200: sieves[1].passant,
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

    getDiameter = (list_sieves: {sieve: string, passant:number}[], percentage: number, limits: {upperLimit: limit, inferiorLimit: limit}) => {
        if (limits.upperLimit.value === percentage) return list_sieves[limits.upperLimit.index].passant;
        if (limits.inferiorLimit.value === percentage) return list_sieves[limits.inferiorLimit.index].passant;
    
        const coefficientA =
            (limits.upperLimit.value - limits.inferiorLimit.value) /
            (list_sieves[limits.upperLimit.index].passant - list_sieves[limits.inferiorLimit.index].passant);
        const coefficientB = limits.upperLimit.value / (coefficientA * list_sieves[limits.upperLimit.index].passant);
    
        return (percentage - coefficientB) / coefficientA;
    }

    getPercentage = (percentage: number, list_sieves: {sieve: string, passant:number}[]) => {
        return list_sieves.reduce(
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