
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AsphaltGranulometryRepository } from '../../../essays/granulometry/repository';
import { AllSieves } from '../../../../../utils/interfaces';
import { DATABASE_CONNECTION } from '../../../../../infra/mongoose/database.config';
import { Marshall, MarshallDocument } from '../schemas';
import { MarshallRepository } from '../repository';

@Injectable()
export class GranulometryComposition_Marshall_Service {
  private readonly logger = new Logger(
    GranulometryComposition_Marshall_Service.name,
  );

  constructor(
    @InjectModel(Marshall.name, DATABASE_CONNECTION.ASPHALT)
    private readonly marshallModel: Model<MarshallDocument>,
    private readonly granulometry_repository: AsphaltGranulometryRepository,
    private readonly marshallRepository: MarshallRepository,
  ) {}

  async getGranulometryData(aggregates: { _id: string; name: string }[]) {
    const granulometrys = await this.granulometry_repository.findAll();

    const granulometryData = aggregates.map((aggregate) => {
      const granulometry = granulometrys.find(
        ({ generalData }) =>
          aggregate._id.toString() === generalData.material._id.toString(),
      );

      const passants = {};

      granulometry?.step2Data?.table_data?.forEach((item) => {
        passants[item.sieve_label] = item.passant;
      });

      return {
        _id: aggregate._id,
        passants,
      };
    });

    const tableColumnHeaders = ['sieve_label'];
    const tableRows = [];

    AllSieves.forEach((sieve) => {
      const containsSieve = granulometryData.some(
        (aggregate) => sieve.label in aggregate.passants,
      );

      if (!containsSieve) return;

      const aggregatesData = {};

      granulometryData.forEach(({ _id, passants }) => {
        const totalPassantKey = `total_passant_${_id}`;
        const passantKey = `passant_${_id}`;

        aggregatesData[totalPassantKey] = passants[sieve.label];
        aggregatesData[passantKey] = null;

        if (!tableColumnHeaders.includes(totalPassantKey)) {
          tableColumnHeaders.push(totalPassantKey, passantKey);
        }
      });

      tableRows.push({
        sieve_label: sieve.label,
        ...aggregatesData,
      });
    });

    this.logger.log(tableRows);
    this.logger.log(tableColumnHeaders);

    return {
      table_column_headers: tableColumnHeaders,
      table_rows: tableRows,
    };
  }

  async calculateGranulometry(body: any) {
    const { dnitBands, percentageInputs, tableRows } = body;

    // Materiais e porcentagens de dosagem
    const percentsOfDosage = [];
    const materialIds = [];

    Object.keys(percentageInputs[0]).forEach((key) => {
      const id = key.split('_')[1];

      if (!materialIds.includes(id)) {
        materialIds.push(id);
        percentsOfDosage.push({ [id]: percentageInputs[0][key] });
      }
    });

    const percentsOfMaterials = percentsOfDosage.map((dosage) => {
      const materialId = Object.keys(dosage)[0];

      return Array(20).fill({ [materialId]: null });
    });

    // Preenchimento dos valores de granulometria dos materiais
    const materialIndexes = new Map();

    percentsOfDosage.forEach((dosage, index) => {
      materialIndexes.set(Object.keys(dosage)[0], index);
    });

    tableRows.forEach((row) => {
      const sieveIndex = AllSieves.findIndex(
        (sieve) => sieve.label === row.sieve_label,
      );

      if (sieveIndex === -1) return;

      Object.keys(row).forEach((key) => {
        const lastIndex = key.lastIndexOf('_');

        if (lastIndex === -1) return;

        const property = key.substring(0, lastIndex);

        if (property !== 'total_passant') return;

        const id = key.substring(lastIndex + 1);
        const materialIndex = materialIndexes.get(id);

        if (materialIndex === undefined) return;

        percentsOfMaterials[materialIndex][sieveIndex] = {
          [id]: row[key],
        };
      });
    });

    // Eixo X e bandas DNIT
    const axisX = [
      76, 64, 50, 38, 32, 25, 19, 12.5, 9.5, 6.3, 4.8, 2.4,
      2, 1.2, 0.85, 0.6, 0.43, 0.3, 0.25, 0.18, 0.15, 0.106,
      0.075,
    ];

    const bands = {
      A: {
        higher: [
          null, null, 100, 100, null, 100, 90, null, 65, null,
          50, null, 40, null, null, 30, null, 20, null, 8,
        ],
        lower: [
          null, null, 100, 95, null, 75, 60, null, 35, null,
          25, null, 20, null, null, 10, null, 5, null, 1,
        ],
      },
      B: {
        higher: [
          null, null, null, 100, null, 100, 100, null, 80, null,
          60, null, 45, null, null, 32, null, 20, null, 8,
        ],
        lower: [
          null, null, null, 100, null, 95, 80, null, 45, null,
          28, null, 20, null, null, 10, null, 8, null, 3,
        ],
      },
      C: {
        higher: [
          null, null, null, null, null, null, 100, 100, 90, null,
          72, null, 50, null, null, 26, null, 16, null, 10,
        ],
        lower: [
          null, null, null, null, null, null, 100, 80, 70, null,
          44, null, 22, null, null, 8, null, 4, null, 2,
        ],
      },
    };

    let band = {
      higher: [],
      lower: [],
    };

    if (bands[dnitBands]) {
      band = {
        higher: this.insertBlankPointsOnCurve(
          [...bands[dnitBands].higher],
          axisX,
        ),
        lower: this.insertBlankPointsOnCurve(
          [...bands[dnitBands].lower],
          axisX,
        ),
      };
    }

    // Cálculo da porcentagem total da composição
    let sumOfPercents = Array(24).fill(null);

    percentsOfMaterials.forEach((material) => {
      material.forEach((materialData, sieveIndex) => {
        if (materialData === null) return;

        const materialId = Object.keys(materialData)[0];
        const materialValue = Object.values(materialData)[0] as number;

        if (materialValue === null) return;

        const dosage = percentsOfDosage.find(
          (item) => Object.prototype.hasOwnProperty.call(item, materialId),
        );

        const dosageValue = dosage ? dosage[materialId] : null;

        const value = (materialValue * dosageValue) / 100;

        material[sieveIndex] = {
          [materialId]: value,
        };

        sumOfPercents[sieveIndex] =
          (sumOfPercents[sieveIndex] ?? 0) + value;
      });
    });

    // Atualização dos valores da tabela
    const newTableRows = tableRows.map((row, rowIndex) => {
      const updatedRow = { ...row };

      Object.keys(row).forEach((key) => {
        const lastIndex = key.lastIndexOf('_');

        if (lastIndex === -1) return;

        const property = key.substring(0, lastIndex);

        if (property !== 'passant') return;

        const id = key.substring(lastIndex + 1);

        const materialIndex = materialIndexes.get(id);
        const sieveIndex = AllSieves.findIndex(
          (sieve) => sieve.label === row.sieve_label,
        );

        const materialData =
          materialIndex !== undefined && sieveIndex !== -1
            ? percentsOfMaterials[materialIndex][sieveIndex]
            : null;

        const calculatedValue =
          materialData && materialData[id] !== undefined
            ? materialData[id]
            : null;

        if (calculatedValue !== null) {
          updatedRow[key] = calculatedValue;
        } else {
          updatedRow[`total_passant_${id}`] = '---';
          this.logger.warn(
            `Material "${id}" não encontrado na linha ${rowIndex}.`,
          );
        }
      });

      return updatedRow;
    });

    // Projeções da composição
    const projections = sumOfPercents.reduce((result, value, index) => {
      if (value !== null && AllSieves[index]) {
        result.push({
          label: AllSieves[index].label,
          value: value.toFixed(2),
        });
      }

      return result;
    }, []);

    sumOfPercents = this.insertBlankPointsOnCurve(
      sumOfPercents,
      axisX,
    );

    // Cálculo das tolerâncias
    const higherTolerance = [];
    const lowerTolerance = [];

    sumOfPercents.forEach((value, index) => {
      if (value === null) {
        higherTolerance.push(null);
        lowerTolerance.push(null);
        return;
      }

      let tolerance = 0;

      if (index < 9) {
        tolerance = 7;
      } else if (index < 16) {
        tolerance = 5;
      } else if (index < 19) {
        tolerance = 3;
      } else if (index === 19) {
        tolerance = 2;
      }

      const upperLimit = Math.min(
        band.higher[index],
        value + tolerance,
      );

      const lowerLimit = Math.max(
        band.lower[index],
        value - tolerance,
      );

      higherTolerance.push(upperLimit);
      lowerTolerance.push(lowerLimit);
    });

    // Pontos utilizados no gráfico
    const pointsOfCurve = sumOfPercents.map((value, index) => [
      axisX[index],
      band.higher[index],
      higherTolerance[index],
      value,
      lowerTolerance[index],
      band.lower[index],
    ]);

    // Substituição de valores nulos na tabela
    newTableRows.forEach((row) => {
      Object.keys(row).forEach((key) => {
        if (row[key] === null) {
          row[key] = '---';
        }
      });
    });

    // Correção dos valores da Banda C
    const correctBandCValues = {
      lower: {
        6: 100,
        8: 70,
        10: 44,
        12: 22,
        14: 14,
        15: 8,
        17: 4,
        19: 2,
      },
      higher: {
        6: 100,
        8: 90,
        10: 72,
        12: 50,
        14: 36.29,
        15: 26,
        17: 16,
        19: 10,
      },
    };

    if (dnitBands === 'C') {
      Object.entries(correctBandCValues.lower).forEach(
        ([index, value]) => {
          band.lower[Number(index)] = value;
        },
      );

      Object.entries(correctBandCValues.higher).forEach(
        ([index, value]) => {
          band.higher[Number(index)] = value;
        },
      );
    }

    // Mapeamento dos índices das peneiras
    const indexCorrection = {
      6: 6,
      14: 15,
      16: 17,
      18: 19,
    };

    const filteredBand = {
      lowerBand: [],
      higherBand: [],
    };

    projections.forEach((projection) => {
      const sieveIndex = AllSieves.findIndex(
        (sieve) => sieve.label === projection.label,
      );

      const bandIndex =
        indexCorrection[sieveIndex] !== undefined
          ? indexCorrection[sieveIndex]
          : sieveIndex;

      filteredBand.lowerBand.push(
        bandIndex !== -1 ? band.lower[bandIndex] ?? null : null,
      );

      filteredBand.higherBand.push(
        bandIndex !== -1 ? band.higher[bandIndex] ?? null : null,
      );
    });

    // Dados formatados para a tabela de bandas
    const tableWithBands = projections.map((projection, index) => ({
      sieve_label: projection.label,
      projection: projection.value,
      inferior:
        filteredBand.lowerBand[index] !== null
          ? filteredBand.lowerBand[index].toFixed(2)
          : '---',
      superior:
        filteredBand.higherBand[index] !== null
          ? filteredBand.higherBand[index].toFixed(2)
          : '---',
    }));

    this.logger.log('Valores finais das projeções e bandas:');
    this.logger.log(tableWithBands);

    return {
      percentsOfMaterials,
      sumOfPercents,
      pointsOfCurve,
      table_data: newTableRows,
      projections,
      bands: filteredBand,
      dnitBands: band,
      tableWithBands,
    };
  }

  
  async saveStep3Data(body: any, userId: string) {
    this.logger.log(
      'save marshall granulometry composition step on granulometry-composition.marshall.service.ts > [body]',
      { body },
    );

    const { name, ...granulometryCompositionWithoutName } =
      body.granulometryCompositionData;

    const marshallExists = await this.marshallRepository.findOne(
      name,
      userId,
    );

    await this.marshallModel.updateOne(
      { _id: marshallExists._id },
      {
        $set: {
          granulometryCompositionData: granulometryCompositionWithoutName,
        },
      },
    );

    if (marshallExists.step < 3) {
      await this.marshallRepository.saveStep(marshallExists, 3);
    }

    return true;
  }

  insertBlankPointsOnCurve(
    curve: number[],
    axisX: number[],
  ): number[] {
    for (let k = 0; k < curve.length; k++) {
      if (curve[k] === null) continue;

      for (let i = k; i < curve.length; i++) {
        if (curve[i] !== null) continue;

        for (let j = i; j < curve.length; j++) {
          if (curve[j] === null) continue;

          curve = this.findEquationOfCurve(
            curve,
            axisX,
            curve[i - 1],
            curve[j],
            axisX[i - 1],
            axisX[j],
            i,
          );

          break;
        }
      }
    }

    return curve;
  }

  findEquationOfCurve(
    curve: number[],
    axisX: number[],
    y2: number,
    y1: number,
    x2: number,
    x1: number,
    i: number,
  ): number[] {
    if (y1 === y2) {
      curve[i] = y1;
      return curve;
    }

    const a = (y2 - y1) / (x2 - x1);
    const b = (y1 * x2 - y2 * x1) / (x2 - x1);

    curve[i] = a * axisX[i] + b;

    return curve;
  }
}