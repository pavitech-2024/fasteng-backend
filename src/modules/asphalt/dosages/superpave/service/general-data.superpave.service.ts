import { Injectable, Logger } from "@nestjs/common";
import { SuperpaveRepository } from '../repository/index';
import { SuperpaveInitDto } from "../dto/superpave-init.dto";
import { AlreadyExists } from "../../../../../utils/exceptions";

@Injectable()
export class GeneralData_Superpave_Service {
    private logger = new Logger(GeneralData_Superpave_Service.name)

    constructor(
        private readonly SuperpaveRepository: SuperpaveRepository,
    ) {}

    async verifyInitSuperpave({ projectName }: SuperpaveInitDto) {
        try {
            this.logger.log('verify init Superpave on general-data.superpave.service.ts > [body]')

            const SuperpaveExists = await this.SuperpaveRepository.findOne({
                "generalData.projectName": projectName,
            })

            if (SuperpaveExists) throw new AlreadyExists('projectName')
            
            return true;
        } catch (error) {
            throw error
        }
        
    }
}
