import { Injectable, Logger } from "@nestjs/common";
import { AlreadyExists } from "../../../../../utils/exceptions";
import { DduiInitDto } from "../dto/init-ddui.dto";
import { DduiRepository } from "../repository";

@Injectable()
export class GeneralData_Ddui_Service {
  private logger = new Logger(GeneralData_Ddui_Service.name);

  constructor(
    private readonly dduiRepository: DduiRepository,
  ) {}

  async verifyInitDdui({ name }: DduiInitDto) {
    try {
      this.logger.log('verify init ddui on general-data.ddui.service.ts > [body]');
      // verificar se existe um material com mesmo nome e userId no banco de dados
      const dduiExists = await this.dduiRepository.findOne({"generalData.name": name});

      // se existir, retorna erro
      if (dduiExists) throw new AlreadyExists(`Ddui with name "${name}.`);

      return true;
    } catch (error) {
      throw error;
    }
  }
}