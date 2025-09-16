import { UnitMass_Step2_Dto } from '../dto/unitMass-step2.dto';
export declare class step2Data_Service {
    verifyStep2DataUnitMass({ containerVolume, containerWeight, sampleContainerWeight }: UnitMass_Step2_Dto): Promise<boolean>;
}
