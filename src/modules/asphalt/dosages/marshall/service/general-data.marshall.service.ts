import { Injectable, Logger } from "@nestjs/common";
import { MarshallRepository } from '../repository/index';
import { AlreadyExists } from "../../../../../utils/exceptions";
import { InjectModel } from "@nestjs/mongoose";
import { DATABASE_CONNECTION } from "../../../../../infra/mongoose/database.config";
import { Model } from "mongoose";
import { Marshall, MarshallDocument } from "../schemas";

@Injectable()
export class GeneralData_Marshall_Service {
  private logger = new Logger(GeneralData_Marshall_Service.name)

  constructor(
    @InjectModel(Marshall.name, DATABASE_CONNECTION.ASPHALT)
    private marshallModel: Model<MarshallDocument>,
    private readonly marshallRepository: MarshallRepository,
  ) { }

  async verifyInitMarshall(marshall: any, userId: string) {
    try {
      this.logger.log('verify init Marshall on general-data.marshall.service.ts > [body]');

      const { name } = marshall;

      const MarshallExists = await this.marshallRepository.findOne(name, userId)

      if (MarshallExists) throw new AlreadyExists('name');

      const createdPartialMarshall = await this.marshallRepository.createPartialMarshall(marshall, userId);

      await this.marshallRepository.saveStep(createdPartialMarshall._doc, 1);

      return true;
    } catch (error) {
      throw error
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

      const completedMarshallDosage = {
        ...marshallExists._doc,
        saveMarshallDosage: marshallDosageWithoutIsConsult,
      };

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