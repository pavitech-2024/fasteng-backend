import { Injectable, Logger } from '@nestjs/common';
import { IggRepository } from '../repository';
import { Calc_Igg_Dto, Calc_Igg_Out } from '../dto/calc-igg.dto';

@Injectable()
export class Calc_Igg_Service {
  private logger = new Logger(Calc_Igg_Service.name);

  constructor(private readonly iggRepository: IggRepository) {}

  async calculateIgg({ iggStep3, iggStep4 }: Calc_Igg_Dto): Promise<{ success: boolean; result: Calc_Igg_Out }> {
    try {
      //cálculo do IGG:
      const { stakes } = iggStep3;
      const sections = iggStep4.sections;
      const iggs = [];
      const igis = [];
      const arrowsAverage = [];
      const variancesAverage = [];
      const dados = [];
      const conditions = [];

      let i = 0;
      let j = 0;
      let firstIndex = -1;
      let lastIndex = -1;
      let partial = [];

      while (i < sections.length && j < stakes.length) {
        if (stakes[j][0] == sections[i].initial) {
          firstIndex = j;
        }
        if (stakes[j][0] == sections[i].final) {
          lastIndex = j + 1;
        }
        if (firstIndex !== -1 && lastIndex !== -1) {
          partial = stakes.slice(firstIndex, lastIndex);
          dados.push(partial);

          firstIndex = -1;
          lastIndex = -1;
          i++;
        }
        j++;
      }

      dados.forEach((segmento) => {
        let fc1 = 0;
        let fc2 = 0;
        let fc3 = 0;
        let afundamento = 0;
        let oP = 0;
        let e = 0;
        let ex = 0;
        let d = 0;
        let r = 0;
        let tre = 0;
        let tri = 0;
        let treQuadrado = 0;
        let triQuadrado = 0;

        //somatorios dos defeitos
        for (let i = 0; i < segmento.length; i++) {
          if (segmento[i][10] || segmento[i][11]) {
            fc3++;
          } else if (segmento[i][8] || segmento[i][9]) {
            fc2++;
          } else if (
            segmento[i][2] ||
            segmento[i][3] ||
            segmento[i][4] ||
            segmento[i][5] ||
            segmento[i][6] ||
            segmento[i][7]
          ) {
            fc1++;
          }

          if (segmento[i][12] || segmento[i][13] || segmento[i][14] || segmento[i][15]) {
            afundamento++;
          }

          if (segmento[i][16] || segmento[i][17]) {
            oP++;
          }

          if (segmento[i][18]) {
            e++;
          }

          if (segmento[i][19]) {
            ex++;
          }

          if (segmento[i][20]) {
            d++;
          }

          if (segmento[i][21]) {
            r++;
          }

          tri += segmento[i][22];
          tre += segmento[i][23];
          treQuadrado += segmento[i][23] ** 2;
          triQuadrado += segmento[i][22] ** 2;
        }

        //cálculo da variância

        const mediaTri = tri / segmento.length;
        const mediaTriQuadrado = triQuadrado / segmento.length;
        const mediaTre = tre / segmento.length;
        const mediaTreQuadrado = treQuadrado / segmento.length;
        const mediaGeral = (mediaTri + mediaTre) / 2;

        const varianciaTri = mediaTriQuadrado - mediaTri ** 2;
        const varianciaTre = mediaTreQuadrado - mediaTre ** 2;
        const mediaVariancia = (varianciaTre + varianciaTri) / 2;

        //cálculo do IGG
        let igg = 0;
        const igi = [];
        igg += (fc1 / (segmento.length - 1)) * 100 * 0.2;
        igi.push((fc1 / (segmento.length - 1)) * 100 * 0.2);

        igg += (fc2 / (segmento.length - 1)) * 100 * 0.5;
        igi.push((fc2 / (segmento.length - 1)) * 100 * 0.5);

        igg += (fc3 / (segmento.length - 1)) * 100 * 0.8;
        igi.push((fc3 / (segmento.length - 1)) * 100 * 0.8);

        igg += (afundamento / (segmento.length - 1)) * 100 * 0.9;
        igi.push((afundamento / (segmento.length - 1)) * 100 * 0.9);

        igg += (oP / (segmento.length - 1)) * 100;
        igi.push((oP / (segmento.length - 1)) * 100);

        igg += (e / (segmento.length - 1)) * 100;
        igi.push((e / (segmento.length - 1)) * 100);

        igg += (ex / (segmento.length - 1)) * 100 * 0.5;
        igi.push((ex / (segmento.length - 1)) * 100 * 0.5);

        igg += (d / (segmento.length - 1)) * 100 * 0.3;
        igi.push((d / (segmento.length - 1)) * 100 * 0.3);

        igg += (r / (segmento.length - 1)) * 100 * 0.6;
        igi.push((r / (segmento.length - 1)) * 100 * 0.6);

        if (mediaGeral <= 30) {
          igg += (mediaGeral * 4) / 3;
          igi.push((mediaGeral * 4) / 3);
        } else {
          igg += 40;
          igi.push(40);
        }
        if (mediaVariancia <= 50) {
          igg += mediaVariancia;
          igi.push(mediaVariancia);
        } else {
          igg += 50;
          igi.push(50);
        }

        //cálculo das porcentagens do IGG
        for (let i = 0; i < igi.length; i++) {
          igi[i] = (igi[i] / igg) * 100;
        }

        if (igg <= 20) {
          conditions.push('Ótimo');
        } else if (igg <= 40) {
          conditions.push('Bom');
        } else if (igg <= 80) {
          conditions.push('Regular');
        } else if (igg <= 160) {
          conditions.push('Ruim');
        } else {
          conditions.push('Péssimo');
        }

        iggs.push(igg);
        igis.push(igi);
        arrowsAverage.push(mediaGeral);
        variancesAverage.push(mediaVariancia);
      });

      return {
        success: true,
        result: {
          iggs,
          igis,
          arrowsAverage,
          variancesAverage,
          conditions,
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
