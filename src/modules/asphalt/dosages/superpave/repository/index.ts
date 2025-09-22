import { InjectModel } from "@nestjs/mongoose";
import { DATABASE_CONNECTION } from "../../../../../infra/mongoose/database.config";
import { FilterQuery, Model } from "mongoose";
import { Superpave, SuperpaveDocument } from "../schemas";
import { SuperpaveGeneralData } from "../types/schema/superpave.types.schema";

export class SuperpaveRepository {
  constructor(
    @InjectModel(Superpave.name, DATABASE_CONNECTION.ASPHALT) 
    private superpaveModel: Model<SuperpaveDocument>
  ) { }

  async create(superpave: Partial<Superpave>): Promise<Superpave> {
    const createdSuperpave = new this.superpaveModel(superpave);
    return createdSuperpave.save();
  }

  async find(): Promise<Superpave[]> {
    return this.superpaveModel.find().sort({ createdAt: -1 }).exec();
  }

 async findOne(name: string, userId: string): Promise<SuperpaveDocument | null> {
  const dosage = await this.superpaveModel.findOne({
    "generalData.name": name,
    "generalData.userId": userId
  }).exec();

  return dosage;
}

  /**
   * Encontra uma dosagem que atenda ao filtro fornecido e atualiza seus dados com base nos dados fornecidos.
   * @param superpaveFilterQuery O filtro para encontrar a dosagem.
   * @param superpave Os dados que serão atualizados na dosagem.
   * @returns Uma promessa que resolve com a dosagem atualizada.
   */
  async findOneAndUpdate(
    superpaveFilterQuery: FilterQuery<Superpave>, 
    superpave: Partial<Superpave>
  ): Promise<Superpave | null> {
    return this.superpaveModel.findOneAndUpdate(
      superpaveFilterQuery, 
      superpave, 
      { new: true }
    ).exec();
  }

  async findById(dosageId: string): Promise<Superpave | null> {
    const dosage = await this.superpaveModel.findById(dosageId).exec();
    return dosage;
  }

  /**
   * Cria uma dosagem parcial, com base em um dado parcial de dosagem.
   * @param superpave O dado parcial de dosagem que será salvo.
   * @param userId O id do usuário que está criando a dosagem.
   * @returns Uma promessa que resolve com a dosagem parcial criada.
   * @throws Erro caso não seja possível criar a dosagem parcial.
   */
  async createPartialSuperpave(
    superpave: Partial<SuperpaveGeneralData>, 
    userId: string
  ): Promise<Superpave> {
    try {
      const createdPartialSuperpave = await this.superpaveModel.create({
        generalData: { ...superpave, userId },
        step: 1 // Definindo step inicial
      });

      return createdPartialSuperpave;
    } catch (error) {
      console.error("Erro ao salvar o step:", error);
      throw error;
    }
  }

  /**
   * Salva o passo atual da dosagem no banco de dados.
   * @param superpaveId O ID da dosagem que terá o passo atualizado.
   * @param step O novo passo que será salvo.
   * @returns Uma promessa que resolve sem parâmetro caso o passo seja salvo com sucesso.
   * @throws Erro caso não seja possível salvar o passo.
   */
  async saveStep(superpaveId: string, step: number): Promise<void> {
    try {
      await this.superpaveModel.updateOne(
        { _id: superpaveId },
        { $set: { step } } // Corrigido: step está no nível raiz, não dentro de generalData
      ).exec();
    } catch (error) {
      console.error("Erro ao salvar o passo:", error);
      throw error;
    }
  }

  /**
   * Deleta uma dosagem pelo ID.
   * @param superpaveId O ID da dosagem a ser deletada.
   * @returns Uma promessa que resolve com o resultado da operação.
   */
  async deleteById(superpaveId: string): Promise<any> {
    return this.superpaveModel.deleteOne({ _id: superpaveId }).exec();
  }

  /**
   * Encontra dosagens por usuário.
   * @param userId O ID do usuário.
   * @returns Uma promessa que resolve com a lista de dosagens do usuário.
   */
  async findByUserId(userId: string): Promise<Superpave[]> {
    return this.superpaveModel.find({ "generalData.userId": userId })
      .sort({ createdAt: -1 })
      .exec();
  }
}