import { Response } from 'express';
import { ElongatedParticlesService } from "../service";
import { Calc_ELONGATEDPARTICLES_Dto, Calc_ELONGATEDPARTICLES_Out } from "../dto/calc.elongatedParticles.dto";
import { ElongatedParticlesInitDto } from "../dto/elongatedParticles-init.dto";
export declare class ElongatedParticlesController {
    private readonly elongatedParticlesService;
    private logger;
    constructor(elongatedParticlesService: ElongatedParticlesService);
    verifyInitElongatedParticles(response: Response, body: ElongatedParticlesInitDto): Promise<Response<any, Record<string, any>>>;
    calculateElongatedParticles(body: Calc_ELONGATEDPARTICLES_Dto): Promise<{
        success: boolean;
        result: Calc_ELONGATEDPARTICLES_Out;
    } | {
        success: boolean;
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
    saveEssay(response: Response, body: Calc_ELONGATEDPARTICLES_Dto & Calc_ELONGATEDPARTICLES_Out): Promise<Response<any, Record<string, any>>>;
}
