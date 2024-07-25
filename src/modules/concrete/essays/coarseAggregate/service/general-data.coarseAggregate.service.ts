import { Injectable, Logger } from "@nestjs/common";
import { MaterialsRepository } from "../../../materials/repository";
import { NotFound, AlreadyExists } from "../../../../../utils/exceptions";
import { CoarseAggregateSpecificMassRepository } from "../repository";

@Injectable()
export class GeneralData_CoarseAggregate_Service {
  private logger = new Logger(GeneralData_CoarseAggregate_Service.name);

  constructor(
    private readonly coarseAggregateRepository: CoarseAggregateSpecificMassRepository,
    private readonly materialsRepository: MaterialsRepository,
  ) {}

  async verifyInitCoarseAggregate({ name, material }: any) {
    try {
      this.logger.log('verify init coarseAggregate on general-data.coarseAggregate.service.ts > [body]');
      // verificar se existe um material com mesmo nome e userId no banco de dados
      const materialExists = await this.materialsRepository.findOne({ _id: material._id });

      // se não existir, retorna erro
      if (!materialExists) throw new NotFound('Chosen material of CoarseAggregate');

      // verificar se existe uma coarseAggregate com mesmo nome e materialId no banco de dados
      const coarseAggregateExists = await this.coarseAggregateRepository.findOne({
        generalData: { name, material: { _id: material._id } },
      });

      // se existir, retorna erro
      if (coarseAggregateExists) throw new AlreadyExists(`CoarseAggregate with name "${name} from user "${material.userId}"`);

      return true;
    } catch (error) {
      throw error;
    }
  }
}