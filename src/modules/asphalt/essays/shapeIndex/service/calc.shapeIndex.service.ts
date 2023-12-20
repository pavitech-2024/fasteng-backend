import { Injectable, Logger } from '@nestjs/common';
import { Calc_SHAPEINDEX_Dto, Calc_SHAPEINDEX_Out } from '../dto/calc.shapeIndex.dto';
import { ShapeIndexRepository } from '../repository';
import { MaterialsRepository } from '../../../../../modules/asphalt/materials/repository';
import { ShapeIndexCircularSieveRow, ShapeIndexReadRow, ShapeIndexSieveRow } from '../schemas';

@Injectable()
export class Calc_SHAPEINDEX_Service {
  private logger = new Logger(Calc_SHAPEINDEX_Service.name);

  constructor(private readonly shapeIndexRepository: ShapeIndexRepository, private readonly materialRepository: MaterialsRepository) { }

  async calculateShapeIndex({ step2Data }: Calc_SHAPEINDEX_Dto): Promise<{ success: boolean; result: Calc_SHAPEINDEX_Out }> {
    try {
      this.logger.log('calculate shapeIndex on calc.shapeIndex.service.ts > [body]');

      const {
        method,
        total_mass,
        graduation,
        circular_sieves_table_data,
        sieves_table_data,
        reads_table_data
      } = step2Data;

      const shape_index = method === 'pachymeter'
        ? this.pachymeterShapeIndex(total_mass, sieves_table_data, reads_table_data)
        : this.circularSieveShapeIndex(total_mass, graduation, circular_sieves_table_data)

      const alerts: string[] = []

      if (shape_index < 0.5) {

        alerts.push("shapeIndex.warning.minimum_value");

      }

      return {
        success: true,
        result: {
          shape_index,
          alerts,
        },
      };
    } catch (error) {
      return {
        success: false,
        result: null
      };
    }
  }

  // shape index by the Pachymeter Method

  pachymeterShapeIndex(total_mass: number, sieves_table_data: ShapeIndexSieveRow[], reads_table_data: ShapeIndexReadRow[]) {
    let shape_index = 0;

    sieves_table_data.forEach((sieve, index) => {
      if (sieve.grains_count > 0) {
        const fi = (sieve.retained_mass * 100) / total_mass;

        const reads = reads_table_data.filter((read, index) => (
          read.sieve === sieve.label
        ));

        const sumShapeIndex = this.pachymeterSumSieve(reads);

        const shapeIndexData = sumShapeIndex / sieve.grains_count;

        shape_index += fi * (shapeIndexData / 100)
      }
    });

    return shape_index;
  }

  pachymeterSumSieve(reads: ShapeIndexReadRow[]) {

    let sum = 0;

    reads.forEach((read) => {
      sum += read.length / read.thickness;
    });

    return sum;

  }

  // shape index by the Circular Sieve Method

  circularSieveShapeIndex(total_mass: number, graduation: string, sieves_table_data: ShapeIndexCircularSieveRow[]) {
    let n: number;

    switch (graduation) {
      case 'A':
        n = 4;
        break;
      case 'B':
        n = 3;
        break;
      case 'C':
        n = 3;
        break;
      case 'D':
        n = 2;
        break;

      default:
        n = 0;
        break;
    }

    let sumSieve: { sum1: number, sum2: number } = this.circularSieveSumSieve(sieves_table_data)

    const shape_index = n > 0
      ? (sumSieve.sum1 + (0.5 * sumSieve.sum2)) / (100 * n)
      : 0;

    return shape_index;
  }

  circularSieveSumSieve(sieves_table_data: ShapeIndexCircularSieveRow[]) {
    let sum1 = 0;
    let sum2 = 0;

    sieves_table_data.forEach((sieve) => {
      sum1 += sieve.sieve1;
      sum2 += sieve.sieve2;
    })

    return { sum1, sum2 };
  }
}