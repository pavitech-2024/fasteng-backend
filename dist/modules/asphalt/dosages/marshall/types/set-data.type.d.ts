import { MarshallGeneralDataDTO } from '../dto/marshal-general-data.dto';
import { MarshallMaterialDataDTO } from '../dto/marshal-material-data.dto';
import { GranulometryCompositionDataDTO } from '../dto/granulometry-composition-data-dto';
import { BinderTrialDataDTO } from '../dto/binder-trial-data.dto';
import { MaximumMixtureDensityDataDTO } from '../dto/maximum-mixture-density-data.dto';
import { VolumetricParametersDataDTO } from '../dto/volumetric-params-data.dto';
import { OptimumBinderContentDataDTO } from '../dto/optinium-binder-content-data.dto';
import { ConfirmationCompressionDataDTO } from '../dto/confirmation-compresion-data.dto';
export type StepData = MarshallGeneralDataDTO | MarshallMaterialDataDTO | GranulometryCompositionDataDTO | BinderTrialDataDTO | MaximumMixtureDensityDataDTO | VolumetricParametersDataDTO | OptimumBinderContentDataDTO | ConfirmationCompressionDataDTO;
