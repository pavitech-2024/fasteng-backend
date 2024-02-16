import { Injectable, Logger } from "@nestjs/common";
import { ConcreteGranulometryRepository } from "../../../../../modules/concrete/essays/granulometry/repository";
import { UnitMassRepository } from "../../../../../modules/concrete/essays/unitMass/repository";
import { MaterialsRepository } from "../../../../../modules/concrete/materials/repository";
import { AlreadyExists } from "utils/exceptions";
import { ABCPRepository } from "../repository";
import { MaterialSelectionDataDto } from "../dto/naterialselection-data.dto";

@Injectable()
export class MaterialSelection_ABCP_Service {
  private logger = new Logger(MaterialSelection_ABCP_Service.name)

  constructor(
    private readonly material_repository: MaterialsRepository,
    private readonly granulometry_repository: ConcreteGranulometryRepository,
    private readonly unit_mass_repository: UnitMassRepository,
    private readonly abcpRepository: ABCPRepository,
  ) { }

  async getMaterials(userId: string) {
    try {
      const materials = await this.material_repository.findByUserId({
        "userId": userId,
      });


      const granulometrys = await this.granulometry_repository.findAll();
      const unit_masses = await this.unit_mass_repository.findAll();

      const cements = materials.filter(({ type }) => {
        return type === 'cement'
      });

      const aggregates = materials.filter(({ _id, type }) => {
        if (type === 'cement') return false
        const granulometry = granulometrys.some(({ generalData }) => {
          const { material } = generalData
          return _id.toString() === material._id.toString()
        });
        const unit_mass = unit_masses.some(({ generalData }) => {
          const { material } = generalData
          return _id.toString() === material._id.toString()
        });
        if (granulometry && unit_mass)
          return granulometry //&& unit_mass;

      });

      const filteredMaterials = cements.concat(aggregates);

      return filteredMaterials;
    } catch (error) {
      throw error;
    }
  }

  async saveMaterials(body: MaterialSelectionDataDto, userId: string) {
    try {
      this.logger.log('save abcp materials step on material-selection.abcp.service.ts > [body]', { body });

      const { name } = body.materialSelectionData;

      const abcpExists = await this.abcpRepository.findOne({
        "generalData.name": name,
        "generalData.userId": userId,
      });

      await this.abcpRepository.saveStep(abcpExists, 2);

      return true;
    } catch (error) {
      throw error
    }
  }

  // async getMaterials(userId: string) {
  //     try {
  //         const materials = await this.material_repository.findByUserId({
  //             "userId": userId,
  //         });

  //         const granulometrys = await this.granulometry_repository.findAll();
  //         const unit_masses = await this.unit_mass_repository.findAll();

  //         const cements = materials.filter(({ type }) => {
  //             return type === 'cement'
  //         }).map(({ _id, type }) => ({ id: _id, type }));

  //         const aggregates = materials.filter(({ _id, type }) => {
  //             if (type === 'cement') return false
  //             const granulometry = granulometrys.some(({ generalData }) => { 
  //                 const { material } = generalData
  //                 return _id.toString() === material._id.toString()
  //             });
  //             const unit_mass = unit_masses.some(({ generalData }) => { 
  //                 const { material } = generalData
  //                 return _id.toString() === material._id.toString()
  //             });
  //             if (granulometry && unit_mass)
  //                 return { id: _id, type };

  //         }).map(({ _id, type }) => ({ id: _id, type })).filter(Boolean);

  //         const filteredMaterials = cements.concat(aggregates);

  //         return filteredMaterials;
  //     } catch (error) {
  //         throw error;
  //     }
  // }

}