import { Injectable, Logger } from '@nestjs/common';
import { AsphaltGranulometryRepository } from '../../../essays/granulometry/repository';
import { AsphaltGranulometry } from '../../../essays/granulometry/schemas';
import { AllSieves } from '../../../../../utils/interfaces';
import { Superpave, SuperpaveDocument } from '../schemas';
import { InjectModel } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from 'infra/mongoose/database.config';
import { SuperpaveRepository } from '../repository';
import { Model } from 'mongoose';

/**
 * Eixo canônico das faixas do DNIT e dos pontos de controle: são tabelas
 * normativas, definidas nestas peneiras. O ensaio, porém, roda na série
 * personalizada que o operador escolheu, que é um subconjunto qualquer.
 * Por isso tudo que vem tabelado é PROJETADO para o eixo do ensaio, nunca
 * indexado por posição.
 */
const CANON_AXIS = [38.1, 25.4, 19.1, 12.7, 9.5, 6.3, 4.8, 2.36, 1.18, 0.6, 0.3, 0.15, 0.075];

@Injectable()
export class GranulometryComposition_Superpave_Service {
  private logger = new Logger(GranulometryComposition_Superpave_Service.name);

  constructor(
    @InjectModel(Superpave.name, DATABASE_CONNECTION.ASPHALT)
    private superpaveModel: Model<SuperpaveDocument>,
    private readonly superpaveRepository: SuperpaveRepository,
    private readonly granulometry_repository: AsphaltGranulometryRepository,
  ) {}

  async getGranulometryData(aggregates: { _id: string; name: string }[]) {
    try {
      const granulometry_data: {
        _id: string;
        passants: {};
      }[] = [];

      const granulometrys = await this.granulometry_repository.findAll();

      aggregates.forEach((aggregate) => {
        const granulometry = granulometrys.find(
          ({ generalData }) => aggregate._id.toString() === generalData.material._id.toString(),
        ) as AsphaltGranulometry;

        const passants = Object.fromEntries(granulometry.results.passant);

        granulometry_data.push({
          _id: aggregate._id,
          passants,
        });
      });

      const table_column_headers: string[] = ['sieve_label'];
      const table_rows = [];

      // Ordena por diâmetro decrescente antes de montar as linhas: a ordem de
      // AllSieves não é garantida, e era daí que vinha a tabela embaralhada na
      // tela (1 1/2" no meio da lista) e a curva serrilhada no gráfico.
      const sievesByDiameter = [...AllSieves].sort((a, b) => Number(b.value) - Number(a.value));

      sievesByDiameter.forEach((sieve) => {
        const contains = granulometry_data.some((aggregate) => sieve.label in aggregate.passants);
        if (!contains) return;

        const aggregates_data = {};

        granulometry_data.forEach((aggregate) => {
          const { _id, passants } = aggregate;

          aggregates_data['total_passant_'.concat(_id)] = passants[sieve.label];
          aggregates_data['passant_'.concat(_id)] = null;

          if (!table_column_headers.some((header) => header.includes(_id))) {
            table_column_headers.push('total_passant_'.concat(_id));
            table_column_headers.push('passant_'.concat(_id));
          }
        });

        table_rows.push({ sieve_label: sieve.label, ...aggregates_data });
      });

      return { table_column_headers, table_rows };
    } catch (error: any) {
      throw error;
    }
  }

  async calculateGranulometry(body: any) {
    try {
      const {
        chosenCurves,
        percentageInputs: percentsOfDosage,
        percentsToList,
        dnitBand,
        materials,
        nominalSize,
      } = body;

      /* --------------------- eixo real do ensaio ------------------------- */

      // Os rótulos vêm do próprio percentsToList, que já reflete a série
      // personalizada escolhida no step 2. Nada de lista fixa de 13 peneiras.
      const labels: string[] = (percentsToList?.[0] ?? []).map((point: any) =>
        Array.isArray(point) ? point[0] : point?.sieve_label,
      );

      const axisX: number[] = labels.map((label) => {
        const sieve = AllSieves.find((s) => s.label === label);
        return sieve ? Number(sieve.value) : NaN;
      });

      if (axisX.length === 0 || axisX.some((value) => Number.isNaN(value))) {
        throw new Error(
          'Não foi possível montar o eixo de peneiras da composição: rótulo ausente em AllSieves ou percentsToList vazio.',
        );
      }

      const pointsOfCurve = [];
      const sumOfPercents = [];

      let lowerComposition = { sumOfPercents: [], percentsOfMaterials: null };
      let averageComposition = { sumOfPercents: [], percentsOfMaterials: null };
      let higherComposition = { sumOfPercents: [], percentsOfMaterials: null };

      const granulometryComposition = {
        lower: {
          percentsOfDosage: {
            value: chosenCurves.includes('lower') ? percentsOfDosage[0] : [],
            isEmpty: chosenCurves.includes('lower'),
          },
        },
        average: {
          percentsOfDosage: {
            value: chosenCurves.includes('average') ? percentsOfDosage[1] : [],
            isEmpty: chosenCurves.includes('average'),
          },
        },
        higher: {
          percentsOfDosage: {
            value: chosenCurves.includes('higher') ? percentsOfDosage[2] : [],
            isEmpty: chosenCurves.includes('higher'),
          },
        },
      };

      /* ----------------------- faixas do DNIT ---------------------------- */

      const bandsByLetter = {
        A: {
          higher: [100, 100, 89, 78, 71, 61, 55, 45, 36, 28, 24, 14, 7],
          lower: [100, 90, 75, 58, 48, 35, 29, 19, 13, 9, 5, 2, 1],
        },
        B: {
          higher: [null, 100, 100, 89, 82, 70, 63, 49, 37, 28, 20, 13, 8],
          lower: [null, 100, 90, 70, 55, 42, 35, 23, 16, 10, 6, 4, 2],
        },
        C: {
          higher: [null, null, null, 100, 100, 89, 83, 67, 52, 40, 29, 19, 10],
          lower: [null, null, null, 100, 90, 65, 53, 32, 20, 13, 8, 4, 2],
        },
      };

      const chosenBand = bandsByLetter[dnitBand] ?? { higher: [], lower: [] };

      const band = {
        higher: this.projectOntoAxis(chosenBand.higher, CANON_AXIS, axisX),
        lower: this.projectOntoAxis(chosenBand.lower, CANON_AXIS, axisX),
      };

      /* ------------------ pontos de controle / zona ----------------------- */

      // Chegam tabelados no eixo canônico (quando chegam — hoje podem vir
      // vazios, o que é um problema na origem do nominalSize, não aqui).
      const controlPoints = {
        lower: this.projectOntoAxis(nominalSize?.controlPoints?.lower ?? [], CANON_AXIS, axisX),
        higher: this.projectOntoAxis(nominalSize?.controlPoints?.higher ?? [], CANON_AXIS, axisX),
      };

      const restrictedZone = {
        lower: this.projectOntoAxis(nominalSize?.restrictedZone?.lower ?? [], CANON_AXIS, axisX),
        higher: this.projectOntoAxis(nominalSize?.restrictedZone?.higher ?? [], CANON_AXIS, axisX),
      };

      if ((nominalSize?.controlPoints?.lower ?? []).length === 0) {
        this.logger.warn(
          `nominalSize.controlPoints veio vazio para TNM ${nominalSize?.value}: o gráfico sai sem pontos de controle.`,
        );
      }

      /* --------------------- densidade máxima (Fuller) -------------------- */

      // D = peneira imediatamente acima do TNM. Buscado por valor, nunca por
      // índice: TNM fora da lista canônica devolvia -1 e caía em 38,1 calado.
      const nmas = Number(nominalSize?.value);
      const above = CANON_AXIS.filter((d) => d > nmas);
      const D = above.length > 0 ? Math.min(...above) : CANON_AXIS[0];

      const densityMaxCurve = axisX.map((d) => (d > D ? null : parseFloat((100 * Math.pow(d / D, 0.45)).toFixed(2))));

      /* ----------------------------- curvas ------------------------------- */

      const emptyCurve = new Array(axisX.length).fill(null);

      if (granulometryComposition.lower.percentsOfDosage.isEmpty) {
        lowerComposition = this.calculatePercentOfMaterials(materials, percentsOfDosage[0], percentsToList);
        sumOfPercents[0] = this.insertBlankPointsOnCurve([...lowerComposition.sumOfPercents], axisX);
      } else {
        sumOfPercents[0] = [...emptyCurve];
      }

      if (granulometryComposition.average.percentsOfDosage.isEmpty) {
        averageComposition = this.calculatePercentOfMaterials(materials, percentsOfDosage[1], percentsToList);
        sumOfPercents[1] = this.insertBlankPointsOnCurve([...averageComposition.sumOfPercents], axisX);
      } else {
        sumOfPercents[1] = [...emptyCurve];
      }

      if (granulometryComposition.higher.percentsOfDosage.isEmpty) {
        higherComposition = this.calculatePercentOfMaterials(materials, percentsOfDosage[2], percentsToList);
        sumOfPercents[2] = this.insertBlankPointsOnCurve([...higherComposition.sumOfPercents], axisX);
      } else {
        sumOfPercents[2] = [...emptyCurve];
      }

      /* --------------------------- pointsOfCurve -------------------------- */

      // As 11 colunas são SEMPRE empurradas, nesta ordem, mesmo quando a curva
      // não foi calculada (aí vai null). O front depende dessa posição fixa
      // para mapear série, cor e legenda.
      //
      // [0]  eixo X = (d/D)^0.45
      // [1]  controlPoints.lower
      // [2]  controlPoints.higher
      // [3]  restrictedZone.lower
      // [4]  restrictedZone.higher
      // [5]  densityMaxCurve (Fuller)
      // [6]  band.higher
      // [7]  band.lower
      // [8]  curva lower
      // [9]  curva average
      // [10] curva higher
      for (let i = 0; i < axisX.length; i++) {
        pointsOfCurve.push([
          parseFloat(Math.pow(axisX[i] / D, 0.45).toFixed(6)),
          controlPoints.lower[i],
          controlPoints.higher[i],
          restrictedZone.lower[i],
          restrictedZone.higher[i],
          densityMaxCurve[i],
          band.higher[i],
          band.lower[i],
          sumOfPercents[0][i],
          sumOfPercents[1][i],
          sumOfPercents[2][i],
        ]);
      }

      const data = {
        lowerComposition,
        averageComposition,
        higherComposition,
        pointsOfCurve,
        nominalSize,
        chosenCurves,
      };

      return { data, success: true };
    } catch (error: any) {
      throw error;
    }
  }

  /**
   * Projeta uma curva tabelada em `fromAxis` (eixo canônico, decrescente) para
   * `toAxis` (o eixo do ensaio). Peneira que existe nos dois eixos é copiada;
   * peneira intermediária é interpolada linearmente entre os vizinhos; peneira
   * fora do intervalo tabelado fica null — extrapolar faixa normativa seria
   * inventar limite que a norma não define.
   */
  projectOntoAxis(curve: (number | null)[], fromAxis: number[], toAxis: number[]): (number | null)[] {
    if (!curve || curve.length === 0) return new Array(toAxis.length).fill(null);

    const filled = this.insertBlankPointsOnCurve([...curve], fromAxis);

    return toAxis.map((d) => {
      const exact = fromAxis.findIndex((x) => Math.abs(x - d) < 1e-9);
      if (exact >= 0) return filled[exact] ?? null;

      // fromAxis é decrescente: acha o par que envolve d
      for (let i = 0; i < fromAxis.length - 1; i++) {
        const x1 = fromAxis[i];
        const x2 = fromAxis[i + 1];

        if (d <= x1 && d >= x2) {
          const y1 = filled[i];
          const y2 = filled[i + 1];
          if (y1 === null || y1 === undefined || y2 === null || y2 === undefined) return null;
          return y1 + ((d - x1) / (x2 - x1)) * (y2 - y1);
        }
      }

      return null;
    });
  }

  insertBlankPointsOnCurve(curve, axisX) {
    for (let k = 0; k < curve.length; k++) {
      if (curve[k] !== null) {
        for (let i = k; i < curve.length; i++) {
          if (curve[i] === null) {
            for (let j = i; j < curve.length; j++) {
              if (curve[j] !== null) {
                curve = this.findEquationOfCurve(curve, axisX, curve[i - 1], curve[j], axisX[i - 1], axisX[j], i);
                break;
              }
            }
          }
        }
      }
    }
    return curve;
  }

  findEquationOfCurve(curve, axisX, y2, y1, x2, x1, i) {
    if (y1 !== y2) curve[i] = ((y2 - y1) / (x2 - x1)) * axisX[i] + (y1 * x2 - y2 * x1) / (x2 - x1);
    else curve[i] = y1;
    return curve;
  }

  /**
   * Um material sem leitura numa peneira não é "não contribui": na peneira
   * grossa ele passa 100%, na fina mantém o último passante conhecido. Sem
   * isso o somatório caía num ponto e voltava a subir no seguinte, o que em
   * granulometria é impossível e aparecia como mergulho na curva.
   */
  private fillMissingPassants(serie: (number | null)[]): number[] {
    let last = 100;
    return serie.map((value) => {
      if (value === null || value === undefined) return last;
      last = Number(value);
      return last;
    });
  }

  calculatePercentOfMaterials(materials, percentsOfDosage, percentsToList) {
    const percentsOfMaterialsToShow = [];
    const materialsWithoutBinder = materials.filter(
      (material) => material.type !== 'asphaltBinder' && material.type !== 'CAP' && material.type !== 'other',
    );

    for (let i = 0; i < percentsToList.length; i++) {
      percentsOfMaterialsToShow.push([]);
    }

    percentsToList.forEach((arr, idx) => {
      arr.forEach((subArr, i) => {
        if (!percentsOfMaterialsToShow[idx][i]) {
          percentsOfMaterialsToShow[idx][i] = [];
        }

        if (Array.isArray(subArr) && subArr.length > 1) {
          percentsOfMaterialsToShow[idx][i] = subArr[1];
        } else {
          percentsOfMaterialsToShow[idx][i] = subArr;
        }
      });
    });

    // Object.values devolve na ordem de inserção das chaves, ou seja, na ordem
    // em que o usuário digitou. As chaves são material_<id>_<n>: ordenar pelo
    // sufixo garante que a porcentagem vá para o material certo.
    const newPercentsOfDosage = Object.keys(percentsOfDosage ?? {})
      .sort((a, b) => Number(a.split('_').pop()) - Number(b.split('_').pop()))
      .map((key) => Number(percentsOfDosage[key]) || 0);

    // Tamanho vem da série do ensaio, não de 13 fixo.
    const sieveCount = percentsToList?.[0]?.length ?? 0;
    const sumOfPercents = new Array(sieveCount).fill(0);
    const percentsOfMaterials = [];

    for (let i = 0; i < materialsWithoutBinder.length; i++) {
      percentsOfMaterials.push([]);

      const serie = this.fillMissingPassants(percentsOfMaterialsToShow[i] ?? []);

      for (let j = 0; j < serie.length; j++) {
        percentsOfMaterials[i][j] = (serie[j] * newPercentsOfDosage[i]) / 100;

        if (sumOfPercents[j] === undefined) sumOfPercents[j] = 0;
        sumOfPercents[j] += percentsOfMaterials[i][j];
      }
    }

    return { sumOfPercents, percentsOfMaterials };
  }

  async saveGranulometryCompositionData(body: any, userId: string) {
    try {
      this.logger.log(
        'save superpave granulometry composition step on granulometry-composition.superpave.service.ts > [body]',
        { body },
      );

      const { name } = body.granulometryCompositionData;

      const superpaveExists: any = await this.superpaveRepository.findOne(name, userId);

      const { name: materialName, ...granulometryCompositionWithoutName } = body.granulometryCompositionData;

      const superpaveWithGranulometryComposition = {
        ...superpaveExists._doc,
        granulometryCompositionData: granulometryCompositionWithoutName,
      };

      await this.superpaveModel.updateOne({ _id: superpaveExists._doc._id }, superpaveWithGranulometryComposition);

      if (superpaveExists._doc.generalData.step < 4) {
        await this.superpaveRepository.saveStep(superpaveExists, 4);
      }

      return true;
    } catch (error: any) {
      throw error;
    }
  }

  async saveStep5Data(body: any, userId: string) {
    try {
      this.logger.log('save superpave initial binder step on granulometry-composition.superpave.service.ts > [body]', {
        body,
      });

      const { name } = body.initialBinderData;

      const superpaveExists: any = await this.superpaveRepository.findOne(name, userId);

      const { name: materialName, ...initialBinderWithoutName } = body.initialBinderData;

      const superpaveWithInitialBinder = { ...superpaveExists._doc, initialBinderData: initialBinderWithoutName };

      await this.superpaveModel.updateOne({ _id: superpaveExists._doc._id }, superpaveWithInitialBinder);

      if (superpaveExists._doc.generalData.step < 5) {
        await this.superpaveRepository.saveStep(superpaveExists, 5);
      }

      return true;
    } catch (error: any) {
      throw error;
    }
  }
}