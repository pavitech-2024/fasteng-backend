import { Injectable, Logger } from "@nestjs/common";
import { MaterialsRepository } from "modules/asphalt/materials/repository";
import { ConcreteGranulometryRepository } from "modules/concrete/essays/granulometry/repository";
import { UnitMassRepository } from "modules/concrete/essays/unitMass/repository";
import { Calc_ABCP_Dto, Calc_ABCP_Out } from "../dto/abcp-calculate-results.dto";

@Injectable()
export class Calculate_ABCP_Results_Service {
  private logger = new Logger(Calculate_ABCP_Results_Service.name)

  constructor(
      private readonly material_repository: MaterialsRepository,
      private readonly granulometry_repository: ConcreteGranulometryRepository,
      private readonly unit_mass_repository: UnitMassRepository,
  ) { }

  async calculateAbcpDosage({ materialSelectionData, essaySelectionData, insertParamsData }: Calc_ABCP_Dto): Promise <{ success: boolean; result: Calc_ABCP_Out }> {
    try {
      this.logger.log('calculate abcp on calc.abcp.service.ts > [body]');

      const { fck, condition } = insertParamsData;

      return
    } catch (error) {
      return {
        success: false,
        result: null
      };
    }
  }
}