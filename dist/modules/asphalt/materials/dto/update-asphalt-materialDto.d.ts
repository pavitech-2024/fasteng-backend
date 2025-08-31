import { CreateAsphaltMaterialDto, DescriptionDto } from './create-asphalt-material.dto';
declare const UpdateAsphaltMaterialDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateAsphaltMaterialDto>>;
export declare class UpdateAsphaltMaterialDto extends UpdateAsphaltMaterialDto_base {
    name?: string;
    type?: 'coarseAggregate' | 'fineAggregate' | 'filler' | 'asphaltBinder' | 'CAP' | 'other';
    description?: DescriptionDto;
}
export {};
