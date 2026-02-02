import { ElongatedParticlesInitDto } from '../dto/elongatedParticles-init.dto';
import { Calc_ELONGATEDPARTICLES_Dto, Calc_ELONGATEDPARTICLES_Out } from '../dto/calc.elongatedParticles.dto';
import { ElongatedParticlesRepository } from '../repository';
import { Calc_ELONGATEDPARTICLES_Service } from './calc.elongatedParticles.service';
import { GeneralData_ELONGATEDPARTICLES_Service } from './general-data.elongatedParticles.service';
export declare class ElongatedParticlesService {
    private readonly generalData_Service;
    private readonly calc_Service;
    private readonly ElongatedParticles_Repository;
    private logger;
    constructor(generalData_Service: GeneralData_ELONGATEDPARTICLES_Service, calc_Service: Calc_ELONGATEDPARTICLES_Service, ElongatedParticles_Repository: ElongatedParticlesRepository);
    verifyInitElongatedParticles(body: ElongatedParticlesInitDto): Promise<{
        result: boolean;
        error?: undefined;
    } | {
        result: {
            success: boolean;
        };
        error: {
            status: any;
            message: any;
            name: any;
        };
    }>;
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
    saveEssay(body: Calc_ELONGATEDPARTICLES_Dto & Calc_ELONGATEDPARTICLES_Out): Promise<{
        success: boolean;
        data: import("../schemas").ElongatedParticles;
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
