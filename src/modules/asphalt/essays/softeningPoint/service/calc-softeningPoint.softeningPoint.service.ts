import { Injectable, Logger } from "@nestjs/common";
import { Calc_SofteningPoint_Dto, Calc_SofteningPoint_Out } from "../dto/calc-softeningPoint.dto";

@Injectable()
export class Calc_SofteningPoint_Service {
  private logger = new Logger(Calc_SofteningPoint_Service.name);

  async calculateSofteningPoint({ softeningPoint, generalData }: Calc_SofteningPoint_Dto): Promise<{ success: boolean; result: Calc_SofteningPoint_Out }> {
    try {
      this.logger.log('calculate softening point on calc.softeningPoint.service.ts > [body]');

      const { temperature1, temperature2 } = softeningPoint;

      const result = {
        softeningPoint: 0,
        indexOfSusceptibility: 0,
        alerts: []
      }

      this.validateInput(temperature1, temperature2);

      result.softeningPoint = (temperature1 + temperature2)/2;

      // Verificação do resultado e obtenção de alertas
      const alert = this.verifyResult(result.softeningPoint, generalData.material._id);
      if (alert) {
        result.alerts.push(alert);
      }

      // Configuração do índice de suscetibilidade
      await this.setIndexOfSusceptibility(result.softeningPoint, generalData.material._id);

      return {
        success: true,
        result,
      };
    } catch (error) {
      throw error;
    }
  }


  private async validateInput(temperature1: number, temperature2: number) {
    try {
      let errorMessage = "";

      if (!temperature1)  errorMessage += "insira a primeira temperatura válida";
      if (!temperature2) {
        if (errorMessage !== "") errorMessage += ", ";

        errorMessage += "insira a segunda temperatura válida"
      } 

      if(errorMessage !== ""){
        throw (errorMessage);
      }
    } catch (error) {
      throw error
    }
  }

  private verifyResult(softeningPoint: number, materialId: string): string {
    // Aqui, você pode implementar a lógica para verificar o resultado e gerar alertas com base no materialId e no ponto de amolecimento.

    // Exemplo:
    let alert = "";

    if (materialId === 'seu-material-id' && softeningPoint < 50) {
      alert = "Alerta: Ponto de amolecimento mínimo deve ser 50°C para este material.";
    }

    // Continue com as verificações de acordo com suas regras de negócio.

    return alert;
  }

  private async setIndexOfSusceptibility(softeningPoint: number, materialId: string) {
    // Implemente a lógica para configurar o índice de suscetibilidade com base no ponto de amolecimento e materialId.
    // Certifique-se de importar e usar seu modelo e repositório de materiais para essa operação.

    // Exemplo:
    if (softeningPoint < 50) {
      // Configure o índice de suscetibilidade com base na lógica do seu aplicativo.
    }
  }
}

