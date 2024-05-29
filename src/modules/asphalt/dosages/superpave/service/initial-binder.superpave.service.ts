import { Injectable, Logger } from "@nestjs/common";
import { AsphaltGranulometryRepository } from "modules/asphalt/essays/granulometry/repository";
import { SuperpaveRepository } from "../repository";
import { GeneralData_Superpave_Service } from "./general-data.superpave.service";
import { GranulometryComposition_Superpave_Service } from "./granulometry-composition.superpave.service";
import { MaterialSelection_Superpave_Service } from "./material-selection.superpave.service";
import { MaterialsRepository } from "modules/asphalt/materials/repository";

@Injectable()
export class InitialBinder_Superpave_Service {
  private logger = new Logger(InitialBinder_Superpave_Service.name);

  constructor(
    private readonly superpave_repository: SuperpaveRepository,
    private readonly generalData_Service: GeneralData_Superpave_Service,
    private readonly materialSelection_Service: MaterialSelection_Superpave_Service,
    private readonly granulometryComposition_Service: GranulometryComposition_Superpave_Service,
    private readonly granulometryRepository: AsphaltGranulometryRepository,
    private readonly asphaltMaterialRepository: MaterialsRepository
  ) {}

  async getSpecificMass(body: any) {
    try {
      const { materials } = body;

      const materialsData = await this.asphaltMaterialRepository.find()

      const data = {}

      return data
    } catch (error) {
      throw error
    }
  }
}