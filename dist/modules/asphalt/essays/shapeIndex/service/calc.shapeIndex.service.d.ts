import { Calc_SHAPEINDEX_Dto, Calc_SHAPEINDEX_Out } from '../dto/calc.shapeIndex.dto';
import { ShapeIndexRepository } from '../repository';
import { MaterialsRepository } from '../../../../../modules/asphalt/materials/repository';
import { ShapeIndexCircularSieveRow, ShapeIndexReadRow, ShapeIndexSieveRow } from '../schemas';
export declare class Calc_SHAPEINDEX_Service {
    private readonly shapeIndexRepository;
    private readonly materialRepository;
    private logger;
    constructor(shapeIndexRepository: ShapeIndexRepository, materialRepository: MaterialsRepository);
    calculateShapeIndex({ step2Data }: Calc_SHAPEINDEX_Dto): Promise<{
        success: boolean;
        result: Calc_SHAPEINDEX_Out;
    }>;
    pachymeterShapeIndex(total_mass: number, sieves_table_data: ShapeIndexSieveRow[], reads_table_data: ShapeIndexReadRow[]): number;
    pachymeterSumSieve(reads: ShapeIndexReadRow[]): number;
    circularSieveShapeIndex(total_mass: number, graduation: string, sieves_table_data: ShapeIndexCircularSieveRow[]): number;
    circularSieveSumSieve(sieves_table_data: ShapeIndexCircularSieveRow[]): {
        sum1: number;
        sum2: number;
    };
}
