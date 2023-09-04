import { Injectable, Logger } from "@nestjs/common";
import { ABCPInitDto } from "../dto/abcp-init.dto";
import { ABCPRepository } from "../repository";
import { GeneralData_ABCP_Service } from "./general-data.abcp.service";
import { Material } from "modules/concrete/materials/schemas";
import { MaterialsRepository } from "modules/concrete/materials/repository";

@Injectable()
export class ABCPService {
    private logger = new Logger(ABCPService.name);

    constructor(
        private readonly generalData_Service: GeneralData_ABCP_Service,
        private readonly material_repository: MaterialsRepository,
        private readonly abcp_repository: ABCPRepository,
        // private readonly granulometry_repository: GranulometryRepository,
        // private readonly unit_mass_repository: UnitMassRepository,
    ) { }

    async verifyInitABCP(body: ABCPInitDto) {
        try {
            const success = await this.generalData_Service.verifyInitABCP(body);

            return { success };
        } catch (error) {
            const { status, name, message } = error;
            return { success: false, error: { status, message, name }};
        }
    }

    async getAllMaterials(userId: string): Promise<Material[]> {
        try {
          // busca todos os materiais no banco de dados que possuam os ensaios para a dosagem
          const materials = await this.material_repository.find();
    
          // retorna os materiais encontrados que pertencem ao usuário
          return materials.filter((material) => material.userId === userId);
        } catch (error) {
          this.logger.error(`error on get all materials > [error]: ${error}`);
    
          throw error;
        }
      }
}