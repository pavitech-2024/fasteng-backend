import { Injectable, Logger } from "@nestjs/common";
import { AlreadyExists } from "../../../../../utils/exceptions";
import { ElasticRecoveryRepository } from "../repository";
import { ElasticRecoveryInitDto } from "../dto/elasticRecovery-init.dto";
import { Calc_ElasticRecovery_Dto, Calc_ElasticRecovery_Out } from "../dto/calc-elasticRecovery.dto";
import { Calc_ElasticRecovery_Service } from "./calc.elasticRecovery.service";
import { GeneralData_ElasticRecovery_Service } from "./general-data.elasticRecovery.service";

@Injectable()
export class ElasticRecoveryService {
  private logger = new Logger(ElasticRecoveryService.name);

  constructor(
    private readonly generalData_Service: GeneralData_ElasticRecovery_Service,
    private readonly calc_Service: Calc_ElasticRecovery_Service,
    private readonly ElasticRecovery_Repository: ElasticRecoveryRepository,
  ) {}

  async verifyInitElasticRecovery(body: ElasticRecoveryInitDto) {
    try {
      const success = await this.generalData_Service.verifyInitElasticRecovery(body);

      return { success };
    } catch (error) {
      const { status, name, message } = error;
      return { result: {success: false}, error: { status, message, name } };
    }
  }

  async calculateElasticRecovery(body: Calc_ElasticRecovery_Dto) {
    try {
      return await this.calc_Service.calculateElasticRecovery(body);
    } catch (error) {
      const { status, name, message } = error;

      return { success: false, error: { status, message, name } };
    }
  }

  async saveEssay(body: Calc_ElasticRecovery_Dto & Calc_ElasticRecovery_Out) {
    try {
      const {
        name,
        material: { _id: materialId },
        userId,
      } = body.generalData;

      // verifica se existe uma recuperação elástica com mesmo nome , materialId e userId no banco de dados
      const alreadyExists = await this.ElasticRecovery_Repository.findOne({
        'generalData.name': name,
        'generalData.material._id': materialId,
        'generalData.userId': userId,
      });

      // se existir, retorna erro
      if (alreadyExists) throw new AlreadyExists(`ElasticRecovery with name "${name}" from user "${userId}"`);

      // se não existir, salva no banco de dados
      const elasticRecovery = await this.ElasticRecovery_Repository.create(body);

      return { success: true, data: elasticRecovery };
    } catch (error) {
      const { status, name, message } = error;

      return { success: false, error: { status, message, name } };
    }
  }
}