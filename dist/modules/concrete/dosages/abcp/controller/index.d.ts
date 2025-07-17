import { Response } from 'express';
import { ABCPService } from '../service';
import { ABCPInitDto } from '../dto/abcp-init.dto';
import { MaterialSelectionDataDto } from '../dto/save-material-selection.dto';
export declare class ABCPController {
    private readonly abcpService;
    private logger;
    constructor(abcpService: ABCPService);
    verifyInitABCP(response: Response, body: ABCPInitDto, userId: string): Promise<Response<any, Record<string, any>>>;
    getMaterialsByUserId(response: Response, userId: string): Promise<Response<any, Record<string, any>>>;
    saveMaterialSelectionStep(response: Response, body: MaterialSelectionDataDto, userId: string): Promise<Response<any, Record<string, any>>>;
    getEssaysByUserId(response: Response, data: any): Promise<Response<any, Record<string, any>>>;
    saveEssaySelectionStep(response: Response, body: any, userId: string): Promise<Response<any, Record<string, any>>>;
    saveInsertParamsStep(response: Response, body: any, userId: string): Promise<Response<any, Record<string, any>>>;
    getAllByUserId(userId: string): Promise<import("../schemas").ABCP[]>;
    getDosageById(dosageId: string): Promise<import("../schemas").ABCP>;
    calculateAbcpDosage(response: Response, data: any): Promise<Response<any, Record<string, any>>>;
    saveConcreteEssay(response: Response, body: any): Promise<Response<any, Record<string, any>>>;
    deleteDosage(response: Response, dosage_id: string): Promise<Response<any, Record<string, any>>>;
}
