import { Injectable } from "@nestjs/common";
import { CoarseAggregateSpecificMassRepository } from "../repository";
import { AlreadyExists } from "utils/exceptions";
import { GeneralData_CoarseAggregate_Service } from "./general-data.coarseAggregate.service";

@Injectable()
export class CoarseAggregateService {
  constructor(
    private readonly generalData_Service: GeneralData_CoarseAggregate_Service,
    private readonly coarseAggregateRepository: CoarseAggregateSpecificMassRepository
  ) {}

  async verifyInitCoarseAggregate(body: any) {
    try {
      const success = await this.generalData_Service.verifyInitCoarseAggregate(body);

      return { success };
    } catch (error) {
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }

  async saveEssay(body: any) {
    try {
      const {
        experimentName,
        material: { _id: materialId },
        userId,
        method,
      } = body.generalData;

      // verifica se existe uma chapman com mesmo nome , materialId e userId no banco de dados
      const alreadyExists = await this.coarseAggregateRepository.findOne({
        'generalData.experimentName': experimentName,
        'generalData.material._id': materialId,
        'generalData.userId': userId,
        'generalData.method': method,
      });

      // se existir, retorna erro
      if (alreadyExists) throw new AlreadyExists(`CoarseAggregate with name "${experimentName}" from user "${userId}"`);

      // se não existir, salva no banco de dados
      const coarseAggregate = await this.coarseAggregateRepository.create(body);

      return { success: true, data: coarseAggregate };
    } catch (error) {
      const { status, name, message } = error;

      return { success: false, error: { status, message, name } };
    }
  }
}