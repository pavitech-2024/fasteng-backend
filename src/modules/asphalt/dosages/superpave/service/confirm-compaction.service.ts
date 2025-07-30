import { Inject, Injectable, Logger } from "@nestjs/common";
import { Model } from "mongoose";
import { SuperpaveRepository } from "../repository";
import { Superpave, SuperpaveDocument } from "../schemas";
import { InjectModel } from "@nestjs/mongoose";
import { DATABASE_CONNECTION } from "infra/mongoose/database.config";

@Injectable()
export class ConfirmCompaction_Superpave_Service {
  private logger = new Logger(ConfirmCompaction_Superpave_Service.name)

  constructor(
    @InjectModel(Superpave.name, DATABASE_CONNECTION.ASPHALT) 
    private superpaveModel: Model<SuperpaveDocument>,
    private readonly superpaveRepository: SuperpaveRepository
  ){}

  async saveConfirmattionCompressionData(body: any, userId: string) {
    try {
      this.logger.log('save superpave confirm compaction step on confirm-compaction.superpave.service.ts > [body]', { body });
      const { name } = body.confirmationCompressionData;

      const superpaveExists: any = await this.superpaveRepository.findOne(name, userId);

      const { name: materialName, ...confirmCompactionWithoutName } = body.confirmationCompressionData;

      const superpaveWithConfirmCompaction = { ...superpaveExists._doc, confirmationCompressionData: confirmCompactionWithoutName };

      await this.superpaveModel.updateOne(
        { _id: superpaveExists._doc._id },
        superpaveWithConfirmCompaction
      );

      if (superpaveExists._doc.generalData.step < 10) {
        await this.superpaveRepository.saveStep(superpaveExists, 10);
      }

      return true;
    } catch (error) {
      throw error
    }
  }
}