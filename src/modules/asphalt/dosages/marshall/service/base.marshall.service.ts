import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { MarshallRepository } from '../repository';
import { Marshall } from '../schemas';
import { CreateMarshallDTO } from '../dto/create-marshal-dto';
import { handleError } from 'utils/error-handler';

@Injectable()
export class BaseMarshallService {
  constructor(private readonly marshall_repository: MarshallRepository) {}

  private readonly stepMapping = {
    generalData: 'generalData',
    materialSelection: 'materialSelectionData',
    granulometryComposition: 'granulometryCompositionData',
    binderTrial: 'binderTrialData',
    maximumMixtureDensity: 'maximumMixtureDensityData',
    volumetricParameters: 'volumetricParametersData',
    optimumBinderContent: 'optimumBinderContentData',
    confirmationCompression: 'confirmationCompressionData',
  } as const;

  async saveStepData(dosageId: string, step: keyof typeof this.stepMapping, data: any, userId: string): Promise<boolean> {
    try {
      const dosage = await this.marshall_repository.findById(dosageId);

      if (!dosage) {
        throw new NotFoundException(`Dosage with ID ${dosageId} not found`);
      }

      if (dosage.generalData && dosage.generalData.userId !== userId) {
        throw new ForbiddenException('User does not have permission to modify this dosage');
      }

      const propertyName = this.stepMapping[step];
      if (!propertyName) {
        throw new BadRequestException(`Invalid step: ${step}`);
      }

      // Crie um objeto que corresponda ao Partial<CreateMarshallDTO>
      const updateData: Partial<CreateMarshallDTO> & { updatedAt?: Date } = {
        updatedAt: new Date()
      };

      // Atribua a propriedade dinâmica usando type assertion
      (updateData as any)[propertyName] = data;

      await this.marshall_repository.findOneAndUpdate(
        { _id: dosageId },
        updateData
      );

      return true;
    } catch (error) {
    handleError(error, "Failed to saveStepData", true);
    throw error;
    }
  }

  async getStepData(dosageId: string, step: keyof typeof this.stepMapping, userId: string): Promise<any> {
    try {
      const dosage = await this.marshall_repository.findById(dosageId);

      if (!dosage) {
        throw new NotFoundException(`Dosage with ID ${dosageId} not found`);
      }

      if (dosage.generalData && dosage.generalData.userId !== userId) {
        throw new ForbiddenException('User does not have permission to access this dosage');
      }

      const propertyName = this.stepMapping[step];
      if (!propertyName) {
        throw new BadRequestException(`Invalid step: ${step}`);
      }

      return dosage[propertyName] || null;
    } catch (error) {
       handleError(error, "Failed to getStepData");
      throw error;
    }
  }
}