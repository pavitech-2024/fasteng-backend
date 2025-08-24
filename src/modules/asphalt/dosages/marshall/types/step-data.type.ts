import { MarshallGeneralDataDTO } from '../dto/marshal-general-data.dto';
import { MarshallMaterialDataDTO } from '../dto/marshal-material-data.dto';
import { GranulometryCompositionDataDTO } from '../dto/granulometry-composition-data-dto';
import { BinderTrialDataDTO } from '../dto/binder-trial-data.dto';
import { MaximumMixtureDensityDataDTO } from '../dto/maximum-mixture-density-data.dto';
import { VolumetricParametersDataDTO } from '../dto/volumetric-params-data.dto';
import { OptimumBinderContentDataDTO } from '../dto/optinium-binder-content-data.dto';
import { ConfirmationCompressionDataDTO } from '../dto/confirmation-compresion-data.dto';

export type StepData = 
  | MarshallGeneralDataDTO
  | MarshallMaterialDataDTO
  | GranulometryCompositionDataDTO
  | BinderTrialDataDTO
  | MaximumMixtureDensityDataDTO
  | VolumetricParametersDataDTO
  | OptimumBinderContentDataDTO
  | ConfirmationCompressionDataDTO;


  export type Step3Data = {
  percentsOfMaterials: any[];
  sumOfPercents: any[];
  pointsOfCurve: any[];
  table_data: any[];
  projections: any[];
  bands: Step3Bands;
};

  export type Step3Result = {
  data: Step3Data | null;
  success: boolean;
  error?: { status?: number; name?: string; message?: string };
};

export type Step3Bands = {
  higherBand: (number | null)[];
  lowerBand: (number | null)[];
};