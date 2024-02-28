import { Injectable, Logger } from "@nestjs/common";
import { ABCPRepository } from '../repository/index';
import { AlreadyExists } from "../../../../../utils/exceptions";

@Injectable()
export class GeneralData_ABCP_Service {
  private logger = new Logger(GeneralData_ABCP_Service.name)

  constructor(
    private readonly abcpRepository: ABCPRepository,
  ) { }

  async verifyInitABCP(abcp: any, userId: string) {
    try {
      this.logger.log('verify init abcp on general-data.abcp.service.ts > [body]')

      const { name } = abcp;

      const abcpExists = await this.abcpRepository.findOne(name, userId);

      if (abcpExists) throw new AlreadyExists('name');

      const createdPartialAbcp = await this.abcpRepository.createPartialAbcp(abcp, userId);

      await this.abcpRepository.saveStep(createdPartialAbcp._doc, 1);

      return true;
    } catch (error) {
      throw error
    }
  }
}