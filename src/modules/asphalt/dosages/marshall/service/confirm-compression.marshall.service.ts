//Codigo puramente refatorado pra remover any dos bodytyps, juntamente com
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from '../../../../../infra/mongoose/database.config';
import { Model } from 'mongoose';
import { MarshallRepository } from '../repository';
import { Marshall, MarshallDocument } from '../schemas';
import { ConfirmationCompressionDataDTO } from '../dto/confirmation-compresion-data.dto';

interface ConfirmSpecificGravityBody {
  method: 'DMT' | 'GMM';
  listOfSpecificGravities: number[];
  percentsOfDosage: { [key: string]: number }[];
  confirmedPercentsOfDosage: number[];
  optimumContent: number;
  gmm?: number;
  valuesOfSpecificGravity?: {
    massOfDrySample: number;
    massOfContainerWaterSample: number;
    massOfContainerWater: number;
  };
}

@Injectable()
export class ConfirmCompression_Marshall_Service {
  private logger = new Logger(ConfirmCompression_Marshall_Service.name);

  constructor(
    private readonly marshallRepository: MarshallRepository,
    @InjectModel(Marshall.name, DATABASE_CONNECTION.ASPHALT)
    private readonly marshallModel: Model<MarshallDocument>,
  ) {}

  async confirmSpecificGravity(body: ConfirmSpecificGravityBody): Promise<{ result: number; type: 'DMT' | 'GMM' }> {
    try {
      this.logger.log('Confirming specific gravity', { body });

      const {
        method,
        listOfSpecificGravities,
        percentsOfDosage,
        confirmedPercentsOfDosage,
        optimumContent,
        gmm,
        valuesOfSpecificGravity,
      } = body;

      const formattedPercentsOfDosage: number[] = [];
      const ids = new Set<string>();

      Object.keys(percentsOfDosage[0]).forEach((key) => {
        const id = key.split('_')[1];
        ids.add(id);
        const value = percentsOfDosage[0][key];
        const index = Array.from(ids).indexOf(id);
        formattedPercentsOfDosage[index] = value;
      });

      if (method === 'DMT') {
        const denominador = formattedPercentsOfDosage.reduce(
          (acc, percent, i) => acc + confirmedPercentsOfDosage[i] / listOfSpecificGravities[i],
          0,
        );
        const DMT = 100 / (denominador + optimumContent / 1.03);
        return { result: DMT, type: 'DMT' };
      } else {
        const GMM =
          gmm ??
          valuesOfSpecificGravity.massOfDrySample /
            (valuesOfSpecificGravity.massOfDrySample -
              valuesOfSpecificGravity.massOfContainerWaterSample +
              valuesOfSpecificGravity.massOfContainerWater);

        return { result: GMM, type: 'GMM' };
      }
    } catch (error) {
      this.logger.error('Error confirming specific gravity', error);
      throw error;
    }
  }

 async saveStep8Data(
  confirmationCompressionData: ConfirmationCompressionDataDTO,
  userId: string,
): Promise<boolean> {
  try {
    this.logger.log('Saving step 8 confirmation compression', { confirmationCompressionData });

    // Busca o documento pelo nome do ensaio (precisa existir 'name' no DTO)
    const marshallExists = await this.marshallRepository.findOne(
      confirmationCompressionData.name,
      userId,
    );

    if (!marshallExists) throw new Error('Marshall not found');

    // Atualiza apenas a parte de confirmationCompressionData
    marshallExists.confirmationCompressionData = confirmationCompressionData;

    // Salva o documento no banco
    await marshallExists.save();

    // Atualiza o step no documento raiz se necessário
    if (marshallExists.step < 8) {
      await this.marshallRepository.saveStep(marshallExists._id, 8);
    }

    return true;
  } catch (error) {
    this.logger.error('Error saving step 8 data', error);
    throw error;
  }
}


}
