import { Injectable, Logger } from "@nestjs/common";
import { MarshallRepository } from '../repository/index';
import { MarshallInitDto } from "../dto/marshall-init.dto";
import { AlreadyExists } from "../../../../../utils/exceptions";

@Injectable()
export class GeneralData_Marshall_Service {
    private logger = new Logger(GeneralData_Marshall_Service.name)

    constructor(
        private readonly MarshallRepository: MarshallRepository,
    ) {}

    async verifyInitMarshall({ projectName }: MarshallInitDto) {
        try {
            this.logger.log('verify init Marshall on general-data.marshall.service.ts > [body]')

            const MarshallExists = await this.MarshallRepository.findOne({
                "generalData.projectName": projectName,
            })

            if (MarshallExists) throw new AlreadyExists('projectName')
            
            return true;
        } catch (error) {
            throw error
        }
        
    }
}