import { MarshallRepository } from '../repository';
export declare class BaseMarshallService {
    private readonly marshall_repository;
    constructor(marshall_repository: MarshallRepository);
    private readonly stepMapping;
    saveStepData(dosageId: string, step: keyof typeof this.stepMapping, data: any, userId: string): Promise<boolean>;
    getStepData(dosageId: string, step: keyof typeof this.stepMapping, userId: string): Promise<any>;
}
