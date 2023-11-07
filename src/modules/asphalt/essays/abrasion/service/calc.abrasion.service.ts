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

      const { initialMass, finalMass } = calcAbrasionDto.abrasionCalc;

      const losAngelesAbrasionResult = this.calculateLosAngelesAbrasion(initialMass, finalMass);

      const alerts = this.verifyResult(losAngelesAbrasionResult);

      return {
        success: true,
        result: {
          losAngelesAbrasion: losAngelesAbrasionResult,
          alerts: alerts,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  private calculateLosAngelesAbrasion(inicialMass: number, finalMass: number): number {
    if (inicialMass > finalMass) {
      return ((inicialMass - finalMass) * 100) / inicialMass;
    } else {
      throw new Error("Atenção: a massa inicial deve ser maior que a massa final.");
    }
  }

  private verifyResult(losAngelesAbrasionResult: number): string[] {
    const alerts: string[] = [];
    if (losAngelesAbrasionResult > 50) {
      alerts.push("Alerta: de acordo com a especificação DNIT 031/2006, o desgaste Los Angeles deve ser igual ou inferior a 50%, admitindo-se excepcionalmente agregados com valores maiores, no caso de terem apresentado comprovadamente desempenho satisfatório em utilização anterior.");
    }
    return alerts;
  }
}