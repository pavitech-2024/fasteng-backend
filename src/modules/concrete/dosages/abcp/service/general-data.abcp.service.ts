import { Injectable, Logger } from "@nestjs/common";
import { ABCPRepository } from '../repository/index';
import { ABCPInitDto } from "../dto/abcp-init.dto";
import { AlreadyExists } from "../../../../../utils/exceptions";

@Injectable()
export class GeneralData_ABCP_Service {
    private logger = new Logger(GeneralData_ABCP_Service.name)

    constructor(
        private readonly abcpRepository: ABCPRepository,
    ) {}

    async verifyInitABCP({ name }: ABCPInitDto) {
        try {
            this.logger.log('verify init abcp on general-data.abcp.service.ts > [body]')

            const abcpExists = await this.abcpRepository.findOne({
                "generalData.name": name,
            })

            if (abcpExists) throw new AlreadyExists('name')
            
            return true;
        } catch (error) {
            throw error
        }
        
    }
}