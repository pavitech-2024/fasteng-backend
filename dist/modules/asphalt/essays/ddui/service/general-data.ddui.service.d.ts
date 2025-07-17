import { DduiInitDto } from "../dto/init-ddui.dto";
import { DduiRepository } from "../repository";
export declare class GeneralData_Ddui_Service {
    private readonly dduiRepository;
    private logger;
    constructor(dduiRepository: DduiRepository);
    verifyInitDdui({ name }: DduiInitDto): Promise<boolean>;
}
