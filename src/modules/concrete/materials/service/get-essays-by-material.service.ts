import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Material } from "../schemas";
import { DATABASE_CONNECTION } from "../../../../infra/mongoose/database.config";
import { ConcreteGranulometryRepository } from "../../essays/granulometry/repository";
import { ChapmanRepository } from "../../essays/chapman/repository";
import { UnitMassRepository } from "../../essays/unitMass/repository";
import { SandIncreaseRepository } from "../../essays/sand-increase/repository";
import { CoarseAggregateSpecificMassRepository } from "../../essays/coarseAggregate/repository";


@Injectable()
export class GetEssaysByMaterial_Service {
  private logger = new Logger(GetEssaysByMaterial_Service.name);

  constructor(
    @InjectModel(Material.name, DATABASE_CONNECTION.CONCRETE)
    private readonly granulometryRepository: ConcreteGranulometryRepository,
    private readonly chapmanRepository: ChapmanRepository,
    private readonly unitMassRepository: UnitMassRepository,
    private readonly sandIncreaseRepository: SandIncreaseRepository,
    private readonly coarseAggregateSpecificMassRepository: CoarseAggregateSpecificMassRepository,
  ) {}

  async getEssaysByMaterial(material: any) {
    try {
      this.logger.log({ material }, 'start get essays by material > asphalt > [service]');

      const { type, _id } = material;

      // Pegar os tipos possíveis d eexperimentos
      const possiblesExperimentTypes = await this.findTypeExperiment(type);

      let essays = [];

      for (const essayName of possiblesExperimentTypes) {
        let essay = null;
        let response;

        // Acessando condicionamente o repositório correto para cada ensaio
        switch (essayName) {
          case 'granulometry':
            response = await this.granulometryRepository.findOne({ 'generalData.material._id': _id.toString() });
            if (response) {
              essay = { essayName, data: response };
            }
            break;
          case 'chapman':
            response = await this.chapmanRepository.findOne({ 'generalData.material._id': _id.toString() });
            if (response) {
              essay = { essayName, data: response };
            }
            break;
          case 'unitMass':
            response = await this.unitMassRepository.findOne({ 'generalData.material._id': _id.toString() });
            if (response) {
              essay = { essayName, data: response };
            }
            break;
          case 'sandIncrease':
            response = await this.sandIncreaseRepository.findOne({ 'generalData.material._id': _id.toString() });
            if (response) {
              essay = { essayName, data: response };
            }
          case 'coarseAggregateSpecificMass':
            response = await this.coarseAggregateSpecificMassRepository.findOne({ 'generalData.material._id': _id.toString() });
            if (response) {
              essay = { essayName, data: response };
            }
            break;
          default:
            break;
        }

        if (essay) {
          essays.push(essay);
        }
      }

      return essays;
    } catch (error) {
      this.logger.error(`error on get essays of this material > [error]: ${error}`);

      throw error;
    }
  }

  findTypeExperiment(typeMaterial): string[] {
    let possiblesExperimentTypes = [];

    switch (typeMaterial) {
      case 'coarseAggregate':
        possiblesExperimentTypes = ['granulometry', 'unitMass', 'sandIncrease', 'chapman', 'specificMass'];
        break;
      case 'fineAggregate':
        possiblesExperimentTypes = ['granulometry', 'unitMass', 'sandIncrease', 'chapman', 'specificMass'];
        break;
      case 'cement':
        possiblesExperimentTypes = ['granulometry', 'unitMass', 'sandIncrease', 'chapman', 'specificMass'];
        break;
      default:
        possiblesExperimentTypes = [];
        break;
    }

    return possiblesExperimentTypes;
  }
}
