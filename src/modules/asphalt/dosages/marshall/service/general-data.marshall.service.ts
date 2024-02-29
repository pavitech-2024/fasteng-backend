import { Injectable, Logger } from "@nestjs/common";
import { MarshallRepository } from '../repository/index';
import { MarshallInitDto } from "../dto/marshall-init.dto";
import { AlreadyExists } from "../../../../../utils/exceptions";

@Injectable()
export class GeneralData_Marshall_Service {
  private logger = new Logger(GeneralData_Marshall_Service.name)

  constructor(
    private readonly MarshallRepository: MarshallRepository,
  ) { }

  async verifyInitMarshall(marshall: any, userId: string) {
    try {
      this.logger.log('verify init Marshall on general-data.marshall.service.ts > [body]');

      const { name } = marshall;

      const MarshallExists = await this.MarshallRepository.findOne(name, userId)

      if (MarshallExists) throw new AlreadyExists('name');

      const createdPartialMarshall = await this.MarshallRepository.createPartialMarshall(marshall, userId);

      await this.MarshallRepository.saveStep(createdPartialMarshall._doc, 1);

      return true;
    } catch (error) {
      throw error
    }

  }
}