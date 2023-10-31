import { Injectable, Logger } from '@nestjs/common';
import { Calc_ANGULARITY_Dto, Calc_ANGULARITY_Out } from '../dto/calc.angularity.dto';
import { AngularityRepository } from '../repository';
import { MaterialsRepository } from '../../../../../modules/asphalt/materials/repository';
import { row_step2 } from '../schemas';

@Injectable()
export class Calc_ANGULARITY_Service {
    private logger = new Logger(Calc_ANGULARITY_Service.name);

    constructor(private readonly angularityRepository: AngularityRepository, private readonly materialRepository: MaterialsRepository) { }

    async calculateAngularity({ step2Data }: Calc_ANGULARITY_Dto): Promise<{ success: boolean; result: Calc_ANGULARITY_Out }> {
        try {
            this.logger.log('calculate angularity on calc.angularity.service.ts > [body]');

            const { relative_density, cylinder_volume, method, determinations } = step2Data;

            const result = this.calculateMethod(relative_density, cylinder_volume, method, determinations)

            this.logger.debug(result)

            return {
                success: true,
                result
            };
        } catch (error) {
            return {
                success: false,
                result: null
            };
        }
    }

    calculateMethod = (relativeDensity: number, cylinderVolume: number, method: string, determinations: row_step2[]) => {

        let average: number[] = [];

        const angularities: {label: string, angularity: number}[] = [];
        const porcentagesOfVoids: number[] = [];
        const alerts: string[] = [];

        let pass = 1;

        if (method === 'B') {
            pass = 2;
        }

        for (let index = 0; index < determinations.length; index = index + pass) {

            const cylinderMass = determinations[index].cylinder_mass;
            const cylinderMassPlusSample = determinations[index].cylinder_mass_plus_sample;

            if (pass === 2) {

                const cylinderMass1 = determinations[index + 1].cylinder_mass;
                const cylinderMassPlusSample1 = determinations[index + 1].cylinder_mass_plus_sample;
                const porcetage1 = Math.round( 100 * (((cylinderVolume - ((cylinderMassPlusSample - cylinderMass) / relativeDensity)) / cylinderVolume) * 100)) / 100;
                const porcetage2 = Math.round( 100 * (((cylinderVolume - ((cylinderMassPlusSample1 - cylinderMass1) / relativeDensity)) / cylinderVolume) * 100)) / 100;

                const averageOfEntry = Math.round( 100 * ((porcetage1 + porcetage2) / 2)) / 100;

                porcentagesOfVoids.push(porcetage1);
                porcentagesOfVoids.push(porcetage2);

                average.push(averageOfEntry);
                angularities.push({label: determinations[index].diameter, angularity: averageOfEntry})
            } else {

                const porcentage = Math.round( 100 * (((cylinderVolume - ((cylinderMassPlusSample - cylinderMass) / relativeDensity)) / cylinderVolume) * 100)) / 100;

                porcentagesOfVoids.push(porcentage);
                average.push(porcentage);
                angularities.push({label: determinations[index].determination, angularity: porcentage})

            }
        }

        const averageOfAll = Math.round( 100 * (average.reduce(function (sum, index) {
            return sum + index;
        }, 0) / average.length)) / 100;

        for (let index = 0; index < porcentagesOfVoids.length; index = index + 2) {

            const element = porcentagesOfVoids[index];
            const element2 = porcentagesOfVoids[index + 1];

            const verifySub = element - element2;

            if (Math.abs(verifySub) > 3.1) {
                alerts.push("A angularidade não deve diferir em mais que 3,1% entre as determinações.");
                break;
            }
        }

        if (averageOfAll < 40) {

            alerts.push("Os agregados miúdos devem apresentar angularidade mínima de 40% para o uso em misturas asfálticas.");

        }

        return {
            angularities,
            averageOfAll,
            porcentagesOfVoids,
            alerts
        };
    }
}