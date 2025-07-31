import { InjectModel } from "@nestjs/mongoose";
import { DATABASE_CONNECTION } from "../../../../../infra/mongoose/database.config";
import { FilterQuery, Model } from "mongoose";
import { Superpave, SuperpaveDocument } from "../schemas";

export class SuperpaveRepository {
  constructor(@InjectModel(Superpave.name, DATABASE_CONNECTION.ASPHALT) private superpaveModel: Model<SuperpaveDocument>) { }

  async create(superpave: any): Promise<Superpave> {
    const createdSuperpave = new this.superpaveModel(superpave);
    return createdSuperpave.save();
  }

  async find(): Promise<Superpave[]> {
    return this.superpaveModel.find().sort({ createdAt: -1 });
  };

  async findOne(name: any, userId: string): Promise<Superpave> {
    const dosage = await this.superpaveModel.findOne({
      "generalData.name": name,
      "generalData.userId": userId
    });
    
    return dosage;
  }

  /**
   * Encontra uma dosagem que atenda ao filtro fornecido e atualiza seus dados com base nos dados fornecidos.
   * @param superpaveFilterQuery O filtro para encontrar a dosagem.
   * @param superpave Os dados que serão atualizados na dosagem.
   * @returns Uma promessa que resolve com a dosagem atualizada.
   */
  async findOneAndUpdate(superpaveFilterQuery: FilterQuery<Superpave>, superpave: Partial<Superpave>): Promise<Superpave> {
    return this.superpaveModel.findOneAndUpdate(superpaveFilterQuery, superpave, {
      new: true,
    });
  }

  async findById(dosageId: string): Promise<Superpave> {
    const dosage = this.superpaveModel.findById(dosageId);
    return dosage;
  }

  /**
   * Cria uma dosagem parcial, com base em um dado parcial de dosagem.
   * @param superpave O dado parcial de dosagem que será salvo.
   * @param userId O id do usuário que está criando a dosagem.
   * @returns Uma promessa que resolve com a dosagem parcial criada.
   * @throws Erro caso não seja possível criar a dosagem parcial.
   */
  async createPartialSuperpave(superpave: any, userId: string): Promise<any> {
    try {
      const createdPartialSuperpave = await this.superpaveModel.create({
        generalData: {...superpave, userId},
      });

      return createdPartialSuperpave;
    } catch (error) {
      console.error("Erro ao salvar o step:", error);
      throw error
    }
  }

  /**
   * Salva o passo atual da dosagem no banco de dados.
   * @param superpave O dosage que ter  o passo atualizado.
   * @param step O novo passo que será salvo.
   * @returns Uma promessa que resolve sem parâmetro caso o passo seja salvo com sucesso.
   * @throws Erro caso não seja possível salvar o passo.
   */
  async saveStep(superpave: any, step: number): Promise<void> {
    try {
      await this.superpaveModel.updateOne(
        { _id: superpave._id },
        { $set: { "generalData.step": step } }
      );
    } catch (error) {
      console.error("Erro ao salvar o passo:", error);
      throw error;
    }
  }
}
