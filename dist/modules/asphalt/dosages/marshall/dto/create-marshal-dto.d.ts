import { MarshallGeneralDataDTO } from './marshal-general-data.dto';
import { MarshallMaterialDataDTO } from './marshal-material-data.dto';
import { GranulometryCompositionDataDTO } from './granulometry-composition-data-dto';
import { BinderTrialDataDTO } from './binder-trial-data.dto';
import { MaximumMixtureDensityDataDTO } from './maximum-mixture-density-data.dto';
import { VolumetricParametersDataDTO } from './volumetric-params-data.dto';
import { OptimumBinderContentDataDTO } from './optinium-binder-content-data.dto';
import { ConfirmationCompressionDataDTO } from './confirmation-compresion-data.dto';
export declare class CreateMarshallDTO {
    generalData: MarshallGeneralDataDTO;
    materialSelectionData: MarshallMaterialDataDTO;
    granulometryCompositionData: GranulometryCompositionDataDTO;
    binderTrialData: BinderTrialDataDTO;
    maximumMixtureDensityData: MaximumMixtureDensityDataDTO;
    volumetricParametersData: VolumetricParametersDataDTO;
    optimumBinderContentData: OptimumBinderContentDataDTO;
    confirmationCompressionData: ConfirmationCompressionDataDTO;
}
