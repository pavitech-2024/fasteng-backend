import { Injectable, Logger } from '@nestjs/common';
import { Calc_FLASHPOINT_Dto, Calc_FLASHPOINT_Out } from '../dto/calc.flashPoint.dto';
import { FlashPointRepository } from '../repository';
import { MaterialsRepository } from '../../../../../modules/asphalt/materials/repository';

@Injectable()
export class Calc_FLASHPOINT_Service {
    private logger = new Logger(Calc_FLASHPOINT_Service.name);

    constructor(private readonly flashpointRepository: FlashPointRepository, private readonly materialRepository: MaterialsRepository) { }

    async calculateFlashPoint({ step2Data }: Calc_FLASHPOINT_Dto): Promise<{ success: boolean; result: Calc_FLASHPOINT_Out }> {
        try {
            this.logger.log('calculate flashpoint on calc.flashPoint.service.ts > [body]');

            const { ignition_temperature } = step2Data;

            return {
                success: true,
                result: {
                    temperature: ignition_temperature,
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