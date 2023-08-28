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

            const ip = liquidity_limit - plasticity_limit;

            const ip_condition = ip > (0.73 * (liquidity_limit - 20));

            const cnu = step2Data.cnu;

            const cc = step2Data.cc;        

            const sucs_classification = classifications.find((classification) => ['sieve4', 'sieve200', 'liquidity_limit', 'organic_matter', 'ip_condition', 'cnu', 'cc'].every(
                (field, ranges) => classification.validateParams ( 
                    field, 
                    {
                        sieve4: sieves[0].passant,
                        sieve200: sieves[1].passant,
                        liquidity_limit: liquidity_limit as number,
                        organic_matter,
                        ip_condition,
                        cnu, 
                        cc
                    }, 
                    ranges
                ),
            ));

            const classification = sucs_classification.code;

            this.logger.log(ip)

            return {
                success: true,
                result: {
                    cc,
                    cnu,
                    ip,
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