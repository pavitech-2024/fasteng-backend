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

  async verifyInitABCP(abcp: any, userId: string) {
    try {
      this.logger.log('verify init abcp on general-data.abcp.service.ts > [body]')

      // if (isConsult) return true

      const { name } = abcp;
      console.log("🚀 ~ GeneralData_ABCP_Service ~ verifyInitABCP ~ name:", name);

      const abcpExists = await this.abcpRepository.findOne(name, userId);

      if (abcpExists) throw new AlreadyExists('name');

      const createdPartialAbcp = await this.abcpRepository.createPartialAbcp(abcp, userId);
      console.log("🚀 ~ GeneralData_ABCP_Service ~ verifyInitABCP ~ createdPartialAbcp:", createdPartialAbcp)
      await this.abcpRepository.saveStep(createdPartialAbcp._doc, 1);

      return true;

      // if (isConsult) return true;

      // const { name } = abcp;
      // console.log("🚀 ~ GeneralData_ABCP_Service ~ verifyInitABCP ~ name:", name);

      // const abcpExists = await this.abcpRepository.findOne({
      //   "generalData.name": name,
      //   "generalData.userId": userId,
      // });

      // if (abcpExists && !isConsult) throw new AlreadyExists('name');

      // const createdPartialAbcp = await this.abcpRepository.createPartialAbcp(abcp, userId);
      // console.log("🚀 ~ GeneralData_ABCP_Service ~ verifyInitABCP ~ createdPartialAbcp:", createdPartialAbcp)

      // await this.abcpRepository.saveStep(createdPartialAbcp._doc, 1);

      // return true;
    } catch (error) {
      throw error
    }
  }
}