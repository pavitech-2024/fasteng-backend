import { Logger } from "@nestjs/common";
import { Injectable } from "@nestjs/common/decorators";
import { AlreadyExists } from "utils/exceptions";
import { ConcreteRtInitDto } from "../dto/concretert-init.dto";
import { ConcreteRtRepository } from "../repository";
import { GeneralData_CONCRETERT_Service } from "./general-data.rt.service";
import { Calc_ConcreteRt_Service } from "./calc.rt.service";
import { Calc_Concrete_RT_Dto, Calc_Concrete_RT_Out } from "../dto/calc.rt.dto";
import { ConcreteRtInterpolationDto } from "../dto/concrete-rt-interpolation.dto";

@Injectable()
export class ConcreteRtService {
  private logger = new Logger(ConcreteRtService.name);

  constructor(
    private readonly generalData_Service: GeneralData_CONCRETERT_Service,
    private readonly calc_ConcreteRt_Service: Calc_ConcreteRt_Service,
    private readonly rt_Repository: ConcreteRtRepository,
  ) {}

  async verifyInitRt(body: ConcreteRtInitDto) {
    try {
      const success = await this.generalData_Service.verifyInitRt(body);

      return { success };
    } catch (error) {
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async calculateConcreteRtInterpolation(body: ConcreteRtInterpolationDto) {
    try {
      const result = await this.calc_ConcreteRt_Service.calculateConcreteRtInterpolation(body);

      return { success: true, result };
    } catch (error) {
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async calculateRt(body: Calc_Concrete_RT_Dto) {
    try {
      return await this.calc_ConcreteRt_Service.calculateConcreteRt(body);
    } catch (error) {
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async saveEssay(body: Calc_Concrete_RT_Dto & Calc_Concrete_RT_Out) {
    try {
      const {
        name,
        material: { _id: materialId },
        userId,
      } = body.generalData;
      

      // verifica se existe uma Rt com mesmo nome , materialId e userId no banco de dados
      const alreadyExists = await this.rt_Repository.findOne({
        'generalData.name': name,
        'generalData.material._id': materialId,
        'generalData.userId': userId,
      });
      

      // se existir, retorna erro
      if (alreadyExists) throw new AlreadyExists(`rt with name "${name}" from user "${userId}"`);

      // se não existir, salva no banco de dados
      const rt = await this.rt_Repository.create(body);

      return { success: true, data: rt };
    } catch (error) {
      const { status, name, message } = error;

      return { success: false, error: { status, message, name } };
    }
  }

}