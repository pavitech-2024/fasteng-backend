import { Injectable, Logger } from "@nestjs/common";
import { ABCPRepository } from '../repository/index';
import { ABCPInitDto } from "../dto/abcp-init.dto";
import { AlreadyExists } from "../../../../../utils/exceptions";
import { throws } from "assert";

@Injectable()
export class GeneralData_ABCP_Service {
  private logger = new Logger(GeneralData_ABCP_Service.name)

  constructor(
    private readonly abcpRepository: ABCPRepository,
  ) { }

  async verifyInitABCP(abcp: any, userId: string, isConsult?: boolean) {
    try {
      this.logger.log('verify init abcp on general-data.abcp.service.ts > [body]')

      if (isConsult) {
        return true
      }

      const { name } = abcp;

      const abcpExists = await this.abcpRepository.findOne({
        "generalData.name": name,
        "generalData.userId": userId,
      })

      if (abcpExists && !isConsult) throw new AlreadyExists('name');

      if (!isConsult) {
        const createdPartialAbcp = await this.abcpRepository.createPartialAbcp(abcp, userId);
        console.log("🚀 ~ GeneralData_ABCP_Service ~ verifyInitABCP ~ createdPartialAbcp:", createdPartialAbcp)
        await this.abcpRepository.saveStep(createdPartialAbcp._doc, 1);
      } else {
        await this.abcpRepository.updatePartialAbcp(abcp, userId);
      }
      return true;
    } catch (error) {
      throw error
    }
  }
}