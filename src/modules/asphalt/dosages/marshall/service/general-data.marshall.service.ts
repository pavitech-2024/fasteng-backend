import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { MarshallRepository } from '../repository/index';
import { AlreadyExists } from "../../../../../utils/exceptions";
import { InjectModel } from "@nestjs/mongoose";
import { DATABASE_CONNECTION } from "../../../../../infra/mongoose/database.config";
import { Model } from "mongoose";
import { Marshall, MarshallDocument } from "../schemas";
import { MarshallInitDto } from "../dto/marshall-init.dto";

@Injectable()
export class GeneralData_Marshall_Service {
  private logger = new Logger(GeneralData_Marshall_Service.name)

  constructor(
    @InjectModel(Marshall.name, DATABASE_CONNECTION.ASPHALT)
    private marshallModel: Model<MarshallDocument>,
    private readonly marshallRepository: MarshallRepository,
  ) { }

  async verifyInitMarshall(marshall: MarshallInitDto, userId: string) {
    try {
      this.logger.log('verify init Marshall on general-data.marshall.service.ts > [body]');

      const { generalData: /*{ name },*/ _id } = marshall;

      const MarshallExists = await this.marshallRepository.findOne(name, userId)

      if (MarshallExists && !_id) throw new AlreadyExists('name');

      const createdPartialMarshall = await this.marshallRepository.createPartialMarshall(marshall, userId);

      await this.marshallRepository.saveStep(createdPartialMarshall._doc, 1);

      return {
        success: true,
        dosage: createdPartialMarshall
      };
    } catch (error) {
      throw error
    }
  }

  async getDosageById(dosageId: string) {
    try {
      this.logger.log(
        'get dosage by id on general-data.marshall.service.ts > [body]',
        {
          dosageId,
        },
      );
      const dosage = await this.marshallRepository.findById(dosageId);

      if (!dosage) {
        throw new NotFoundException(`Dosage whith id ${dosageId} not found`);
      }

      return dosage;
    } catch (error) {
      throw error;
    }
  }

  async saveMarshallDosage(body: any, userId: string) {
    try {
      this.logger.log(
        'save marshall dosage on general-data.marshall.service.ts > [body]',
        {
          body,
        },
      );

      const { name } = body.generalData;

      const marshallExists: any = await this.marshallRepository.findOne(name, userId);

      const { isConsult, ...marshallDosageWithoutIsConsult } = body;
      

      // const completedMarshallDosage = {
      //   ...marshallExists._doc,
      //   saveMarshallDosage: marshallDosageWithoutIsConsult,
      // };
      const completedMarshallDosage = { ...marshallExists._doc, ...marshallDosageWithoutIsConsult };

      await this.marshallModel.updateOne({ _id: marshallExists._doc._id }, completedMarshallDosage);

      if (marshallExists._doc.generalData.step < 9) {
        await this.marshallRepository.saveStep(marshallExists, 9);
      }

      return true;
    } catch (error) {
      throw error;
    }
  }

  async deleteMarshallDosage(id: string) {
    try {
      this.logger.log(
        'delete marshall dosage on general-data.marshall.service.ts > [body]',
        {
          id,
        },
      );

      const result = await this.marshallModel.findByIdAndDelete(id);

      if (!result) {
        throw new Error('Documento não encontrado para deletar.')
      }

      return true;
    } catch (error) {
      throw error;
    }
  }
}