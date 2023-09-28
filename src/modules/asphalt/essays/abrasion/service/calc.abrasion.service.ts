import { Injectable, Logger } from "@nestjs/common";
import { MaterialsRepository } from "modules/asphalt/materials/repository";
import { AbrasionRepository } from "../repository";
import { Calc_Abrasion_Dto, Calc_Abrasion_Out } from "../dto/calc-abrasion.dto";

@Injectable()
export class Calc_Abrasion_Service {
  private logger = new Logger(Calc_Abrasion_Service.name);

  constructor(private readonly abrasionRepository: AbrasionRepository, private readonly materialRepository: MaterialsRepository) {}

  async calculateAbrasion(calcAbrasionDto: Calc_Abrasion_Dto): Promise<{ success: boolean; result: Calc_Abrasion_Out }> {
    try {
      this.logger.log('calculate abrasion on calc.abrasion.service.ts > [body]');


      // Cálculos de penetração;
      const points = calcAbrasionDto.abrasionCalc.points;
      const abrasion = points.reduce((soma, valor) => soma += valor) / points.length;

      // Lgica para definir o índice de susceptibilidade;
      let indexOfSusceptibility = 0;
      const materialId = calcAbrasionDto.generalData.material._id;
      const materialFinded = await this.materialRepository.findOne({ _id: materialId });

      if (materialFinded) {
        if (materialFinded.description?.classification_CAP === "CAP 30/45" || materialFinded.description?.classification_CAP === "CAP 50/70"
          || materialFinded.description?.classification_CAP === "CAP 85/100" || materialFinded.description?.classification_CAP === "CAP 150/200") {
          const softeningPointQuery = materialFinded.getLastExperimentId(false);

          if (!softeningPointQuery.catch) {
            const softeningPointFinded = await this.materialRepository.findOne(softeningPointQuery.experiment);
            if (softeningPointFinded) {
              indexOfSusceptibility = softeningPointFinded.indexOfSusceptibility || 0;
            }
          }
        }
      }

      // Lógica para comparar o resultado de penetração com a norma DNIT;
      const maxDifference = this.calculateMaxDifference(abrasion);
      const alert = this.compareHighAndLower(points, maxDifference);

      // Lógica para classificar o CAP
      const cap = this.classifyCap(abrasion, materialFinded?.description?.classification_CAP, alert);

      const result: Calc_Abrasion_Out = {
        abrasion: abrasion,
        cap: cap.type,
        alerts: alert ? ["Atenção: diferença máxima entre o valor mais alto e mais baixo das determinações acima do valor recomendado (DNIT-ME 155/2010)."] : [],
        indexOfSusceptibility: indexOfSusceptibility
      };

      return {
        success: true,
        result: result,
      };
    } catch (error) {
      throw error;
    }
  }

  private calculateMaxDifference(abrasion: number): number {
    if (abrasion >= 0 && abrasion <= 4.9) {
      return 0.2;
    } else if (abrasion >= 5 && abrasion <= 14.9) {
      return 0.4;
    } else if (abrasion >= 15 && abrasion <= 24.9) {
      return 1.2;
    } else if (abrasion >= 25 && abrasion <= 50) {
      return 2;
    }
    return 0;
  }

  private compareHighAndLower(points: number[], maxDifference: number): boolean {
    const max = Math.max(...points);
    const min = Math.min(...points);
    return maxDifference !== 0 && Math.abs(max - min) > maxDifference;
  }

  private classifyCap(abrasion: number, materialRanking: string, alert: boolean): { type: string; alert: string } {
    let type = "";
    let capAlert = "";

    if (abrasion >= 3 && abrasion <= 4.5) {
      type = "CAP 30/45";
    } else if (abrasion >= 5 && abrasion <= 7) {
      type = "CAP 50/70";
    } else if (abrasion >= 8.5 && abrasion <= 10) {
      type = "CAP 85/100";
    } else if (abrasion >= 15 && abrasion <= 20) {
      type = "CAP 150/200";
    }

    if (!materialRanking && (materialRanking === "asphalt binder" || materialRanking === "other")) {
      materialRanking = type;
    } else {
      if (!materialRanking && materialRanking === "modified asphalt binder" && materialRanking.includes("AMP")) {
        capAlert += this.ampAlert(abrasion, materialRanking);
      }
    }

    return { type: type, alert: capAlert };
  }

  private ampAlert(abrasion: number, ranking: string): string {
    let out = false;
    if ((ranking === "AMP 50/65" || ranking === "AMP 55/75") && (abrasion < 4.5 || abrasion > 7)) {
      out = true;
    } else if ((ranking === "AMP 60/85" || ranking === "AMP 65/90") && (abrasion < 4 || abrasion > 7)) {
      out = true;
    }
    if (out) {
      return `Atenção: resultado de penetração fora dos limites especificados para o ${ranking}.`;
    }
    return "";
  }
}