import { CompressionService } from '../service';
import { Response } from 'express';
import { CompressionInitDto } from '../dto/compression-init.dto';
import { Calc_Compression_Dto, Calc_Compression_Out } from '../dto/calc.compression.dto';
export declare class CompressionController {
    private readonly compressionService;
    private logger;
    constructor(compressionService: CompressionService);
    verifyInitCompression(response: Response, body: CompressionInitDto): Promise<Response<any, Record<string, any>>>;
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
    saveEssay(response: Response, body: Calc_Compression_Dto & Calc_Compression_Out): Promise<Response<any, Record<string, any>>>;
}
