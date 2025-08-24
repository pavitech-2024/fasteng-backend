// save-step.dto.ts
import { IsString, IsNotEmpty, IsObject, IsOptional, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { StepData } from '../types/step-data.type';
import { MarshallStep } from '../types/marshall.types';
import { BandsOfTemperaturesDTO } from './binder-trial-data.dto';


export class SaveStepDTO {
  @ApiProperty({ description: 'ID da dosagem' })
  @IsString()
  @IsNotEmpty()
  dosageId: string;

  @ApiProperty({ 
    description: 'Nome do step',
    enum: ['generalData', 'materialSelection', 'granulometryComposition', 'binderTrial', 'maximumMixtureDensity', 'volumetricParameters', 'optimumBinderContent', 'confirmationCompression']
  })
  @IsString()
  @IsIn(['generalData', 'materialSelection', 'granulometryComposition', 'binderTrial', 'maximumMixtureDensity', 'volumetricParameters', 'optimumBinderContent', 'confirmationCompression'])
  @IsNotEmpty()
  step: MarshallStep;

  @ApiProperty({ description: 'Dados do step' })
  @IsObject()
  @IsNotEmpty()
  data: any;

  @ApiProperty({ description: 'ID do usuário' })
  @IsString()
  @IsNotEmpty()
  userId: string;
}

export class SaveStep3DTO {
  @ApiProperty({ description: 'ID da dosagem' })
  @IsString()
  @IsNotEmpty()
  dosageId: string;

  @ApiProperty({ description: 'Dados de composição granulométrica' })
  @IsObject()
  @IsNotEmpty()
  data: {
    percentsOfMaterials: any[];
    sumOfPercents: any[];
    pointsOfCurve: any[];
    table_data: any[];
    projections: any[];
    bands: {
      higherBand: any[];
      lowerBand: any[];
    };
  };
}


export class SaveStep4DTO {
  @ApiProperty({ description: 'ID da dosagem' })
  @IsString()
  @IsNotEmpty()
  dosageId: string;

  @ApiProperty({ description: 'Dados do trial do binder' })
  @IsObject()
  @IsNotEmpty()
  data: {
    trial: string; // ou o tipo correto do trial
    percentsOfDosage: any[];
    bandsOfTemperatures: BandsOfTemperaturesDTO[];
    newPercentOfDosage: any[];
  };
}


export class SaveStep5DTO {
  @ApiProperty({ description: 'ID da dosagem' })
  @IsString()
  @IsNotEmpty()
  dosageId: string;

  @ApiProperty({ description: 'Dados de densidade máxima da mistura' })
  @IsObject()
  @IsNotEmpty()
  data: {
    maxSpecificGravity: {
      result: {
        lessOne: number;
        lessHalf: number;
        normal: number;
        plusHalf: number;
        plusOne: number;
      };
      method: string;
    };
    listOfSpecificGravities: number[];
  };
}

export class SaveStep6DTO {
  @ApiProperty({ description: 'ID da dosagem' })
  @IsString()
  @IsNotEmpty()
  dosageId: string;

  @ApiProperty({ description: 'Dados de parâmetros volumétricos' })
  @IsObject()
  @IsNotEmpty()
  data: {
    pointsOfCurveDosageRBV: {
      x: number;
      y: number;
    }[];
    pointsOfCurveDosageVv: {
      x: number;
      y: number;
    }[];
    volumetricParameters: {
      asphaltContent: number;
      values: {
        aggregateVolumeVoids: number;
        apparentBulkSpecificGravity: number;
        diametricalCompressionStrength: number;
        fluency: number;
        maxSpecificGravity: number;
        ratioBitumenVoid: number;
        stability: number;
        voidsFilledAsphalt: number;
        volumeVoids: number;
      };
    }[];
  };
}

export class SaveStep7DTO {
  @ApiProperty({ description: 'ID da dosagem' })
  @IsString()
  @IsNotEmpty()
  dosageId: string;

  @ApiProperty({ description: 'Dados de conteúdo ótimo de binder' })
  @IsObject()
  @IsNotEmpty()
  data: {
    optimumBinder: {
      confirmedPercentsOfDosage: number[];
      curveRBV: {
        a: number;
        b: number;
      };
      curveVv: {
        a: number;
        b: number;
      };
      optimumContent: number;
      pointsOfCurveDosage: any[];
    };
    expectedParameters: {
      expectedParameters: {
        Gmb: number;
        RBV: number;
        Vam: number;
        Vv: number;
        newMaxSpecificGravity: number;
      };
    };
    graphics: {
      rbv: any[];
      vv: any[];
      sg: any[];
      gmb: any[];
      stability: any[];
      vam: any[];
    };
  };
}

export class SaveStep8DTO {
  @ApiProperty({ description: 'ID da dosagem' })
  @IsString()
  @IsNotEmpty()
  dosageId: string;

  @ApiProperty({ description: 'Dados de confirmação da compressão' })
  @IsObject()
  @IsNotEmpty()
  data: {
    dmt: number;
    gmm: number;
    confirmedSpecificGravity: {
      result: number;
      type: string;
    };
    confirmedVolumetricParameters: {
      pointsOfCurveDosageRBV: {
        x: number;
        y: number;
      }[];
      pointsOfCurveDosageVv: {
        x: number;
        y: number;
      }[];
      volumetricParameters: {
        asphaltContent: number;
        values: {
          aggregateVolumeVoids: number;
          apparentBulkSpecificGravity: number;
          diametricalCompressionStrength: number;
          fluency: number;
          maxSpecificGravity: number;
          ratioBitumenVoid: number;
          stability: number;
          voidsFilledAsphalt: number;
          volumeVoids: number;
        };
      }[];
    };
    optimumBinder: {
      id: number;
      diammeter: number;
      height: number;
      dryMass: number;
      submergedMass: number;
      drySurfaceSaturatedMass: number;
      stability: number;
      fluency: number;
      diametricalCompressionStrength: number;
    }[];
    riceTest: {
      teor: string;
      massOfDrySample: number;
      massOfContainerWaterSample: number;
      massOfContainerWater: number;
    };
  };
}