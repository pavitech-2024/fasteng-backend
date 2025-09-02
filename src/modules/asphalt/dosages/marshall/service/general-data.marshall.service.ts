//Codigo puramente refatorado pra remover any dos bodytyps, juntamente com responses adequados
import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { MarshallRepository } from '../repository';
import { AlreadyExists } from "../../../../../utils/exceptions";
import { InjectModel } from "@nestjs/mongoose";
import { DATABASE_CONNECTION } from "../../../../../infra/mongoose/database.config";
import { Model } from "mongoose";
import { Marshall, MarshallDocument } from "../schemas";
import { MarshallGeneralDataDTO } from "../dto/marshal-general-data.dto";
import { handleError } from "utils/error-handler";

@Injectable()
export class GeneralData_Marshall_Service {
  private logger = new Logger(GeneralData_Marshall_Service.name);

  constructor(
    @InjectModel(Marshall.name, DATABASE_CONNECTION.ASPHALT)
    private readonly marshallModel: Model<MarshallDocument>,
    private readonly marshallRepository: MarshallRepository,
  ) {}

  // Verifica se já existe ensaio, cria parcial q é parecido com optional do sequelize se não existir
  async verifyInitMarshall(marshall: MarshallGeneralDataDTO, userId: string):Promise<{ success: boolean; dosage: MarshallDocument }> {
    try {
      this.logger.log('Verify init Marshall');

      const { name } = marshall;

      const existingMarshall = await this.marshallRepository.findOne(name, userId);

      if (existingMarshall) throw new AlreadyExists('name');

      const createdPartialMarshall = await this.marshallRepository.createPartialMarshall(marshall, userId);

      // Atualiza o step para 1
      await this.marshallRepository.saveStep(createdPartialMarshall._id, 1);

      return {
        success: true,
        dosage: createdPartialMarshall,
      };
    } catch (error) {
      throw error;
    }
  }

  // Busca ensaio por ID
  async getDosageById(dosageId: string): Promise<MarshallDocument> {
  try {
    this.logger.log('Getting dosage by ID', { dosageId });

    const dosage = await this.marshallRepository.findById(dosageId);
    if (!dosage) {
      this.logger.warn(`Dosage with id ${dosageId} not found`);
      throw new NotFoundException(`Dosage with id ${dosageId} not found`);
    }

    return dosage;
  } catch (error) {
    this.logger.error('Error fetching dosage by ID', error);
    throw error;
  }
}


  // Salva o ensaio completo
async saveMarshallDosage(
  body: Partial<Marshall> & { isConsult?: boolean },
  userId: string,
): Promise<boolean> {
  try {
    this.logger.log('Saving marshall dosage', { body, userId });

    const { isConsult, ...marshallDataToSave } = body; // ignora isConsult

    const marshallExists = await this.marshallRepository.findOne(
      marshallDataToSave.generalData.name,
      userId,
    );

    if (!marshallExists) {
      this.logger.warn('Marshall not found', { name: marshallDataToSave.generalData.name, userId });
      throw new NotFoundException('Marshall not found');
    }

    // Atualiza os campos do documento Mongoose
    marshallExists.set(marshallDataToSave);
    await marshallExists.save();

    // Atualiza step se necessário
    if (marshallExists.step < 9) {
      await this.marshallRepository.saveStep(marshallExists._id, 9);
    }

    return true;
  } catch (error) {
    handleError(error,"Error saving marshall dosage", true )
    throw error;
  }
}




  // Deleta ensaio
  async deleteMarshallDosage(id: string): Promise<boolean> {
    try {
      this.logger.log('Delete marshall dosage', { id });

      const result = await this.marshallModel.findByIdAndDelete(id);

      if (!result) throw new NotFoundException('Documento não encontrado para deletar.');

      return true;
    } catch (error) {
       handleError(error, "Failed on deleteMarshallDosage", true)
       throw error;
    }
  }
}
