import { Injectable, Logger } from "@nestjs/common";
import { Calc_SofteningPoint_Dto, Calc_SofteningPoint_Out } from "../dto/calc-softeningPoint.dto";
import { Material } from "../../../../../modules/asphalt/materials/schemas";
import { SofteningPoint } from "../schemas";
import { MaterialsService } from "modules/asphalt/materials/service";

@Injectable()
export class Calc_SofteningPoint_Service {

  constructor(
    private materialsService: MaterialsService,
  ) {}

  private logger = new Logger(Calc_SofteningPoint_Service.name);

  async calculateSofteningPoint({ softeningPoint, generalData }: Calc_SofteningPoint_Dto): Promise<{ success: boolean; result: Calc_SofteningPoint_Out }> {
    try {
      this.logger.log('calculate softening point on calc.softeningPoint.service.ts > [body]');

      const { material } = generalData;
      const { temperature1, temperature2 } = softeningPoint;

      const result = {
        softeningPoint: 0,
        indexOfSusceptibility: 0,
        alerts: []
      };

      result.softeningPoint = (temperature1 + temperature2) / 2;


      // Verificação do resultado e obtenção de alertas
      const alert = await this.verifyResult(softeningPoint, material, result.softeningPoint);

      if (alert.length > 0) {
        result.alerts.push(...alert);
      }

      // Configuração do índice de suscetibilidade
      // const indexOfSusceptibility = this.setIndexOfSusceptibility(result.softeningPoint, material);

      return {
        success: true,
        result,
      };
    } catch (error) {
      throw error;
    }
  }

  private async verifyResult(softeningPointData: any, materialData: Material, softeningPointResult: number): Promise<string[]> {

    let alerts = [];
    let alert: string;

    const { temperature1, temperature2 } = softeningPointData;
    const materialType = materialData.type;
    const classificationAMP = materialData.description.classification_AMP;
    const classificationCAP = materialData.description.classification_CAP;

    if (Math.abs(temperature1 - temperature2) > 2) {
      alerts.push("Alerta: a diferença entre as temperaturas não deve ser maior que 2°C.");
    }

    if (materialType === 'asphaltBinder' && classificationAMP !== null) {
      alert = await this.verifyResultForAmp(classificationAMP, softeningPointResult);
      if (alert) alerts.push(alert)
    } else if (materialType === 'asphaltBinder' && classificationCAP !== null) {
      alert = await this.verifyResultForCap(classificationCAP, softeningPointResult);
      if (alert) alerts.push(alert)
    }

    return alerts;
  }

  private async verifyResultForAmp(classification_AMP: string, softeningPointResult: number) {

    let alert: string = "";

    if (classification_AMP === "AMP 50/65" && softeningPointResult < 50) {
      alert = "Alerta: para o " + classification_AMP + " o ponto de amolecimento mínimo deve ser 50 °C";
    } else if (classification_AMP === "AMP 55/75" && softeningPointResult  < 55) {
      alert = "Alerta: para o " + classification_AMP + " o ponto de amolecimento mínimo deve ser 55 °C";
    } else if (classification_AMP === "AMP 60/85" && softeningPointResult  < 60) {
      alert = "Alerta: para o " + classification_AMP + " o ponto de amolecimento mínimo deve ser 60 °C";
    } else if (classification_AMP === "AMP 65/90" && softeningPointResult  < 65) {
      alert = "Alerta: para o " + classification_AMP + " o ponto de amolecimento mínimo deve ser 65 °C";
    }

    return alert
  }

  private async verifyResultForCap(classification_CAP: string,  softeningPointResult: number) {

    let alert: string = "";

    if (classification_CAP === "CAP 30/45" && softeningPointResult < 52) {
      alert = "Alerta: de acordo com a ANP (2005), para o " + classification_CAP + " o ponto de amolecimento mínimo deve ser 52 °C";
    } else if (classification_CAP === "CAP 50/70" && softeningPointResult  < 46) {
      alert = "Alerta: de acordo com a ANP (2005), para o " + classification_CAP + " o ponto de amolecimento mínimo deve ser 46 °C";
    } else if (classification_CAP === "CAP 85/100" && softeningPointResult  < 43) {
      alert = "Alerta: de acordo com a ANP (2005), para o " + classification_CAP + " o ponto de amolecimento mínimo deve ser 43 °C";
    } else if (classification_CAP === "CAP 150/200" && softeningPointResult  < 37) {
      alert = "Alerta: de acordo com a ANP (2005), para o " + classification_CAP + " o ponto de amolecimento mínimo deve ser 37 °C";
    }

    return alert
  }

  // private async setIndexOfSusceptibility(softeningPoint: number, materialData: Material) {
  //   // Implemente a lógica para configurar o índice de suscetibilidade com base no ponto de amolecimento e materialId.
  //   // Certifique-se de importar e usar seu modelo e repositório de materiais para essa operação.

  //   const { classification_CAP } = materialData.description;

  //   // Exemplo:
  //   if (classification_CAP !== null) {
  //     const penetrationQuery =  await this.materialsService.
  //   }
  // }
}

