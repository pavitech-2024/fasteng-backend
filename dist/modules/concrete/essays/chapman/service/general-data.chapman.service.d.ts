import { MaterialsRepository } from '../../../materials/repository';
import { ChapmanInitDto } from '../dto/chapman-init.dto';
import { ChapmanRepository } from '../repository';
export declare class GeneralData_Chapman_Service {
    private readonly chapmanRepository;
    private readonly materialsRepository;
    private logger;
    constructor(chapmanRepository: ChapmanRepository, materialsRepository: MaterialsRepository);
    verifyInitChapman({ name, material }: ChapmanInitDto): Promise<boolean>;
}
