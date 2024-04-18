import { Injectable, Logger } from '@nestjs/common';
import { FwdRepository } from '../repository';
import { Calc_Fwd_Dto, Calc_Fwd_Out } from '../dto/calc-fwd.dto';

@Injectable()
export class Calc_Fwd_Service {
  private logger = new Logger(Calc_Fwd_Service.name);

  constructor(private readonly fwdRepository: FwdRepository) {}

  async calculateFwd({ fwdStep3 }: Calc_Fwd_Dto): Promise<{ success: boolean; result: Calc_Fwd_Out }> {
    try {
      const dFWD2Db = (dFWD, forca) => {
        const fwdMicro = (dFWD / 10) * (41 / forca);
        let fwd;
        if (fwdMicro > 85) {
          fwd = 8.964 * Math.pow(fwdMicro - 60 > 0 ? fwdMicro - 60 : 0, 0.715);
        } else {
          fwd = 20.645 * Math.pow(fwdMicro - 19 > 0 ? fwdMicro - 19 : 0, 0.351);
        }
        return fwd / 10;
      };

      //cálculo do FWD:
      const { spreadsheetData } = fwdStep3;

      let cumulativeArea = 0;
      const deflection = (data, index) => (index === 0 ? 0.0 : ((data[index].d1 + data[index - 1].d1) / 2) * 10);
      const positions = [];

      const newD = spreadsheetData.filter((data, index) => {
        if (dFWD2Db(data.d1, data.force) > 0) {
          return data;
        }

        positions.push(index);
      });
      const processedData = newD
        .map((data) => {
          const obj = {
            hodometro: data.hodometro,
            force: data.force,
          };
          return Object.keys(data).reduce((acc, key) => {
            if (String(key)[0] === 'd')
              return {
                ...acc,
                [key]: dFWD2Db(data[key], data.force),
              };
            return acc;
          }, obj);
        })
        .map((data, index, spreadsheetData) => {
          const meanDeflection = deflection(spreadsheetData, index);

          const areaBetweenStationCurves =
            meanDeflection * (index === 0 ? 0 : data.hodometro - spreadsheetData[index - 1].hodometro);
          cumulativeArea += areaBetweenStationCurves;
          return {
            ...data,
            meanDeflection,
            areaBetweenStationCurves,
            cumulativeArea,
          };
        })
        .map((data, index, spreadsheetData) => {
          return {
            ...data,
            cumulativeDifference:
              data.cumulativeArea -
              (spreadsheetData[spreadsheetData.length - 1].cumulativeArea /
                spreadsheetData[spreadsheetData.length - 1].hodometro) *
                data.hodometro,
          };
        });

      const graphData = processedData.map((dado) => [dado.hodometro, dado.cumulativeDifference]);
      return {
        success: true,
        result: {
          processedData,
          graphData,
          deletedPositions: positions,
        },
      };
    } catch (error) {
      return {
        success: false,
        result: null,
      };
    }
  }
}
