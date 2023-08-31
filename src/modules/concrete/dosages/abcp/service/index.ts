import { Injectable, Logger } from "@nestjs/common";
import { ABCPInitDto } from "../dto/abcp-init.dto";
import { ABCPRepository } from "../repository";
import { GeneralData_ABCP_Service } from "./general-data.abcp.service";

@Injectable()
export class ABCPService {
    private logger = new Logger(ABCPService.name);

    constructor(
        private readonly generalData_Service: GeneralData_ABCP_Service,
        private readonly abcp_repository: ABCPRepository,
    ) { }

    async verifyInitABCP(body: ABCPInitDto) {
        try {
            const success = await this.generalData_Service.verifyInitABCP(body);

            return { success };
        } catch (error) {
            const { status, name, message } = error;
            return { success: false, error: { status, message, name }};
        }
    }
}