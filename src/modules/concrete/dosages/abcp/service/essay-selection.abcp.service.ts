import { Injectable, Logger } from "@nestjs/common";
import { MaterialsRepository } from "../../../../../modules/concrete/materials/repository";
import { ConcreteGranulometryRepository } from "../../../../../modules/concrete/essays/granulometry/repository";
import { UnitMassRepository } from "../../../../../modules/concrete/essays/unitMass/repository";
import { ABCPEssaySelectionDto } from "../dto/abcp-essay-selection.dto";
import { ABCPRepository } from "../repository";
import { EssaySelectionDataDto } from "../dto/save-essay-selection.dto";
import { InjectModel } from "@nestjs/mongoose";
import { DATABASE_CONNECTION } from "infra/mongoose/database.config";
import { Model } from "mongoose";
import { ABCP, ABCPDocument } from "../schemas";

@Injectable()
export class EssaySelection_ABCP_Service {
  private logger = new Logger(EssaySelection_ABCP_Service.name)

  constructor(
    @InjectModel(ABCP.name, DATABASE_CONNECTION.CONCRETE) 
    private abcpModel: Model<ABCPDocument>,
    private readonly material_repository: MaterialsRepository,
    private readonly granulometry_repository: ConcreteGranulometryRepository,
    private readonly unit_mass_repository: UnitMassRepository,
    private readonly abcpRepository: ABCPRepository,
  ) { }

  async getEssays({ cement, coarseAggregate, fineAggregate }: ABCPEssaySelectionDto) {
    try {

      const materials = await this.material_repository.find();

      const cementData = materials.find((material) => {
        const { name } = material;
        if (material._id.toString() === cement.id.toString()) {
          return {
            cement,
            name,
          }
        }
      });

      const coarseGranulometrys = await this.granulometry_repository.findAllGranulometrysByMaterialId(coarseAggregate.id.toString(), 'coarse');
      const fineGranulometrys = await this.granulometry_repository.findAllGranulometrysByMaterialId(fineAggregate.id, 'fine');
      const unit_masses = await this.unit_mass_repository.findAllUnitMassesByMaterialId(coarseAggregate.id);

      const coarseAggregates = materials
        .filter((material) => coarseAggregate.id.toString() === material._id.toString())
        .map((material) => {
          const granulometry_esssays = coarseGranulometrys.filter((essay) => (
            essay.generalData.material._id.toString() === material._id.toString()
          ));
          const unit_mass_essays = unit_masses.filter((essay) => (
            essay.generalData.material._id.toString() === material._id.toString()
          ));

          return {
            _id: material._id,
            name: material.name,
            granulometrys: granulometry_esssays,
            unit_masses: unit_mass_essays,
          };
        });

      const coarseAggregateData = coarseAggregates.length > 0 ? coarseAggregates[0] : null;


      const fineAggregates = materials
        .filter((material) => fineAggregate.id.toString() === material._id.toString())
        .map((material) => {
          const granulometry_esssays = fineGranulometrys.filter((essay) => (
            essay.generalData.material._id.toString() === material._id.toString()
          ));

          return {
            _id: material._id,
            name: material.name,
            granulometrys: granulometry_esssays,
          }
        });

      const fineAggregateData = fineAggregates.length > 0 ? fineAggregates[0] : null;

      return {
        cementData,
        coarseAggregateData,
        fineAggregateData,
      };
    } catch (error) {
      throw error
    }
  }

  async saveEssays(body: EssaySelectionDataDto, userId: string) {
    try {
      this.logger.log('save abcp essays step on essays-selection.abcp.service.ts > [body]', { body });

      const { name } = body.essaySelectionData;

      const abcpExists: any = await this.abcpRepository.findOne({
        "generalData.name": name,
        "generalData.userId": userId,
      });

      const { name: essayName, ...essayDataWithoutName } = body.essaySelectionData;
      const abcpWithEssays = { ...abcpExists._doc, essaySelectionData: essayDataWithoutName };

      await this.abcpModel.updateOne(
        { "_id": abcpExists._id },
        abcpWithEssays
      );

      await this.abcpRepository.saveStep(abcpExists._doc, 3);

      console.log("🚀 ~ EssaySelection_ABCP_Service ~ saveEssays ~ abcpExists:", abcpExists)

      return true;
    } catch (error) {
      throw error
    }
  }
}

