import { Injectable, Logger } from "@nestjs/common";
import { ABCPInitDto } from "../dto/abcp-init.dto";
import { GeneralData_ABCP_Service } from "./general-data.abcp.service";
import { MaterialSelection_ABCP_Service } from "./material-selection.abcp.service";

@Injectable()
export class ABCPService {
    private logger = new Logger(ABCPService.name);

    constructor(
        private readonly generalData_Service: GeneralData_ABCP_Service,
        private readonly materialSelection_Service: MaterialSelection_ABCP_Service,
    ) { }

    async verifyInitABCP(body: ABCPInitDto) {
        try {
            const success = await this.generalData_Service.verifyInitABCP(body);

            return { success };
        } catch (error) {
            this.logger.error(`error on verify init > [error]: ${error}`);
            const { status, name, message } = error;
            return { success: false, error: { status, message, name }};
        }
    }

    async getUserMaterials(userId: string) {
        try {
          const materials = await this.materialSelection_Service.getMaterials(userId);

          this.logger.log(`materials returned > [materials]: ${materials}`)
    
          return { materials, success: true };
        } catch (error) {
          this.logger.error(`error on get all materials by user id > [error]: ${error}`);
          const { status, name, message } = error;
          return { materials: [], success: false, error: { status, message, name }};
        }
      }
}