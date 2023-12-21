import { Injectable, Logger } from '@nestjs/common';
import { Calc_ViscosityRotational_Dto, Calc_ViscosityRotational_Out } from '../dto/calc-viscosityRotational.dto';

@Injectable()
export class Calc_ViscosityRotational_Service {
  private logger = new Logger(Calc_ViscosityRotational_Service.name);

  async calculateViscosityRotational({
    viscosityRotational,
    generalData,
  }: Calc_ViscosityRotational_Dto): Promise<{ success: boolean; result: Calc_ViscosityRotational_Out }> {
    try {
      this.logger.log('calculateViscosityRotational on calc.viscosityRotational.service.ts > [body]');

      const { dataPoints } = viscosityRotational;

      const result: Calc_ViscosityRotational_Out = {
        graph: '',
        machiningTemperatureRange: {
          higher: 0,
          lower: 0,
          average: 0,
        },
        compressionTemperatureRange: {
          higher: 0,
          lower: 0,
          average: 0,
        },
        aggregateTemperatureRange: {
          higher: 0,
          lower: 0,
          average: 0,
        },
        curvePoints: [],
        equation: {
          aIndex: 0,
          bIndex: 0,
        },
      };

      const temperatures: number[] = [];
      const viscositys: number[] = [];

      const equation = this.calculateEquation(dataPoints);

      let cont = 120;

      for (let i = 0; i < 120; i++) {
        temperatures[i] = cont;
        viscositys[i] =
          this.calculateViscosity(cont, equation) !== Infinity ? this.calculateViscosity(cont, equation) : 0;
        cont += 1;
      }

      const ranges = this.insertValuesInRanges(150, 190, 250, 310, equation);

      const bandsOfCurve = this.insertBandsOfCurve(temperatures, viscositys, 150, 190, 250, 310);

      result.curvePoints = bandsOfCurve;
      result.aggregateTemperatureRange = ranges.aggregateTemperatureRange;
      result.compressionTemperatureRange = ranges.compressionTemperatureRange;
      result.machiningTemperatureRange = ranges.machiningTemperatureRange;

      result.equation.aIndex = equation.aIndex;
      result.equation.bIndex = equation.bIndex;

      return {
        success: true,
        result,
      };
    } catch (error) {
      throw error;
    }
  }

  private calculateEquation(dataPoints: any[]) {
    //posicao 0 = a da equacao
    const aIndex =
      (dataPoints.length * this.sumXY(dataPoints) - this.sumX(dataPoints) * this.sumY(dataPoints)) /
      (dataPoints.length * this.sumPow2X(dataPoints) - this.Pow2SumX(dataPoints));

    //posicao 1 = b da equacao
    const bIndex = Math.exp(
      (this.sumX(dataPoints) * this.sumXY(dataPoints) - this.sumY(dataPoints) * this.sumPow2X(dataPoints)) /
        (this.Pow2SumX(dataPoints) - dataPoints.length * this.sumPow2X(dataPoints)),
    );

    const equationValues = {
      aIndex,
      bIndex,
    };

    return equationValues;
  }

  private sumXY(dataPoints: any[]) {
    let exit = 0;
    for (let i = 0; i < dataPoints.length; i++) {
      exit += dataPoints[i].temperature * Math.log(dataPoints[i].viscosity);
    }
    return exit;
  }

  private sumX(dataPoints: any[]) {
    let exit = 0;
    for (let i = 0; i < dataPoints.length; i++) {
      exit += dataPoints[i].temperature;
    }
    return exit;
  }

  private sumY(dataPoints: any[]) {
    let exit = 0;
    for (let i = 0; i < dataPoints.length; i++) {
      exit += Math.log(dataPoints[i].viscosity);
    }
    return exit;
  }

  private sumPow2X(dataPoints) {
    let exit = 0;
    for (let i = 0; i < dataPoints.length; i++) {
      exit += dataPoints[i].temperature * dataPoints[i].temperature;
    }
    return exit;
  }

  private Pow2SumX(dataPoints) {
    let exit = 0;
    for (let i = 0; i < dataPoints.length; i++) {
      exit += dataPoints[i].temperature;
    }
    return exit * exit;
  }

  private calculateViscosity(temperature: number, equation) {
    const viscosity = equation.bIndex * Math.exp(equation.aIndex * temperature);
    return viscosity;
  }

  private calculateTemperature(viscosity, equation) {
    const temperature = (Math.log(viscosity) - Math.log(equation.bIndex)) / equation.aIndex;

    return temperature;
  }

  private insertValuesInRanges(temp1, temp2, temp3, temp4, equation) {
    const lowerMachiningTemperatureRange = this.calculateTemperature(temp2, equation);
    const higherMachiningTemperatureRange = this.calculateTemperature(temp1, equation);
    const averageMachiningTemperatureRange =
      this.calculateTemperature(temp2, equation) + this.calculateTemperature(temp2, equation) / 2;

    const machiningTemperatureRange = {
      lower: lowerMachiningTemperatureRange,
      higher: higherMachiningTemperatureRange,
      average: averageMachiningTemperatureRange,
    };

    const lowerCompressionTemperatureRange = this.calculateTemperature(temp4, equation);
    const higherCompressionTemperatureRange = this.calculateTemperature(temp3, equation);
    const averageCompressionTemperatureRange =
      this.calculateTemperature(temp3, equation) + this.calculateTemperature(temp4, equation) / 2;

    const compressionTemperatureRange = {
      lower: lowerCompressionTemperatureRange,
      higher: higherCompressionTemperatureRange,
      average: averageCompressionTemperatureRange,
    };

    let higherAggregateTemperature, lowerAggregateTemperature;

    if (higherMachiningTemperatureRange + 15 > 177) higherAggregateTemperature = 177;
    else higherAggregateTemperature = higherMachiningTemperatureRange + 15;
    if (lowerMachiningTemperatureRange + 15 > 177) lowerAggregateTemperature = 177;
    else lowerAggregateTemperature = lowerMachiningTemperatureRange + 15;

    const aggregateTemperatureRange = {
      higher: higherAggregateTemperature,
      average: (higherAggregateTemperature + lowerAggregateTemperature) / 2,
      lower: lowerAggregateTemperature,
    };

    return {
      machiningTemperatureRange,
      compressionTemperatureRange,
      aggregateTemperatureRange,
    };
  }

  private insertBandsOfCurve(
    temperatures,
    viscositys,
    bandsLowerMachiningY,
    bandsHigherMachiningY,
    bandsLowerCompressionY,
    bandsHigherCompressionY,
  ) {
    const points = [];
    let temperature: number[];
    let viscosity;

    points.push([
      'Temperatura (ºC)',
      'Viscosidade (SSF)',
      'Faixa de usinagem',
      'Faixa de usinagem',
      'Faixa de compactação',
      'Faixa de compactação',
    ]);

    for (let index = 0; index < temperatures.length; index++) {
      temperature = temperatures[index];
      viscosity = viscositys[index];
      points.push([
        temperature,
        viscosity,
        bandsLowerMachiningY,
        bandsHigherMachiningY,
        bandsLowerCompressionY,
        bandsHigherCompressionY,
      ]);
    }

    return points;
  }
}
