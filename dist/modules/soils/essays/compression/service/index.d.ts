import { CompressionRepository } from '../repository';
import { GeneralData_Compression_Service } from './general-data.compression.service';
import { Calc_Compression_Service } from './calc.compression.service';
import { CompressionInitDto } from '../dto/compression-init.dto';
import { Calc_Compression_Dto, Calc_Compression_Out } from '../dto/calc.compression.dto';
export declare class CompressionService {
    private readonly generalData_Service;
    private readonly calc_Service;
    private readonly compressionRepository;
    constructor(generalData_Service: GeneralData_Compression_Service, calc_Service: Calc_Compression_Service, compressionRepository: CompressionRepository);
    verifyInitCompression(body: CompressionInitDto): Promise<{
        success: boolean;
        error?: undefined;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    calculateCompression(body: Calc_Compression_Dto): Promise<{
        success: boolean;
        result: Calc_Compression_Out;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveEssay(body: Calc_Compression_Dto & Calc_Compression_Out): Promise<{
        success: boolean;
        data: import("../schema").Compression;
        error?: undefined;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
        data?: undefined;
    }>;
}
