import { Injectable, Logger } from "@nestjs/common";
import { AlreadyExists } from "utils/exceptions";
import { Calc_CONCRETERC_Dto, Calc_CONCRETERC_Out } from "../dto/calc.rc.dto";
import { ConcreteRcInitDto } from "../dto/concretert-init.dto";
import { ConcreteRCRepository } from "../respository";
import { Calc_CONCRETERC_Service } from "./calc.rc.service";
import { GeneralData_CONCRETERC_Service } from "./general-data.rc.service";

@Injectable()
export class ConcreteRcService {
  private logger = new Logger(ConcreteRcService.name);

  constructor(
    private readonly generalData_Service: GeneralData_CONCRETERC_Service,
    private readonly calc_concreteRc_Service: Calc_CONCRETERC_Service,
    private readonly Rc_Repository: ConcreteRCRepository,
  ) {}

  async verifyInitRc(body: ConcreteRcInitDto) {
    try {
      const success = await this.generalData_Service.verifyInitRc(body);

      return { success };
    } catch (error) {
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async calculateRc(body: Calc_CONCRETERC_Dto) {
    try {
      return await this.calc_concreteRc_Service.calculateRc(body);
    } catch (error) {
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async saveEssay(body: Calc_CONCRETERC_Dto & Calc_CONCRETERC_Out) {
    try {
      const {
        name,
        material: { _id: materialId },
        userId,
      } = body.generalData;
      

      // verifica se existe uma Rc com mesmo nome , materialId e userId no banco de dados
      const alreadyExists = await this.Rc_Repository.findOne({
        'generalData.name': name,
        'generalData.material._id': materialId,
        'generalData.userId': userId,
      });

      // se existir, retorna erro
      if (alreadyExists) throw new AlreadyExists(`Rc with name "${name}" from user "${userId}"`);

      // se não existir, salva no banco de dados
      const Rc = await this.Rc_Repository.create(body);

      return { success: true, data: Rc };
    } catch (error) {
      const { status, name, message } = error;

      return { success: false, error: { status, message, name } };
    }
  }

}