import { MarshallGeneralDataDTO } from './marshal-general-data.dto';
import { ApiProperty } from '@nestjs/swagger';
import { MarshallMaterialDataDTO } from './marshal-material-data.dto';
import { GranulometryCompositionDataDTO } from './granulometry-composition-data-dto';
import { BinderTrialDataDTO } from './binder-trial-data.dto';
import { MaximumMixtureDensityDataDTO } from './maximum-mixture-density-data.dto';
import { VolumetricParametersDataDTO } from './volumetric-params-data.dto';
import { OptimumBinderContentDataDTO } from './optinium-binder-content-data.dto';
import { ConfirmationCompressionDataDTO } from './confirmation-compresion-data.dto';

export class CreateMarshallDTO {
  @ApiProperty({ type: MarshallGeneralDataDTO })
  generalData: MarshallGeneralDataDTO;

  @ApiProperty({ type: MarshallMaterialDataDTO })
  materialSelectionData: MarshallMaterialDataDTO;

  @ApiProperty({ type: GranulometryCompositionDataDTO })
  granulometryCompositionData: GranulometryCompositionDataDTO;

  @ApiProperty({ type: BinderTrialDataDTO })
  binderTrialData: BinderTrialDataDTO;

  @ApiProperty({ type: MaximumMixtureDensityDataDTO })
  maximumMixtureDensityData: MaximumMixtureDensityDataDTO;

  @ApiProperty({ type: VolumetricParametersDataDTO })
  volumetricParametersData: VolumetricParametersDataDTO;

  @ApiProperty({ type: OptimumBinderContentDataDTO })
  optimumBinderContentData: OptimumBinderContentDataDTO;

  @ApiProperty({ type: ConfirmationCompressionDataDTO })
  confirmationCompressionData: ConfirmationCompressionDataDTO;
}
