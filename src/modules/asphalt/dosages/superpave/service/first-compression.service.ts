import { Injectable, Logger } from '@nestjs/common';
import { SuperpaveRepository } from '../repository';
import { InjectModel } from '@nestjs/mongoose';
import { Superpave, SuperpaveDocument } from '../schemas';
import { DATABASE_CONNECTION } from 'infra/mongoose/database.config';
import { Model } from 'mongoose';

@Injectable()
export class FirstCompression_Superpave_Service {
  private logger = new Logger(FirstCompression_Superpave_Service.name);

  constructor(
    @InjectModel(Superpave.name, DATABASE_CONNECTION.ASPHALT)
    private superpaveModel: Model<SuperpaveDocument>,
    private readonly superpaveRepository: SuperpaveRepository,
  ) {}

  // first-compression.superpave.service.ts

async calculateGmm_RiceTest(body: any): Promise<any> {
  try {
    this.logger.log({ body }, 'start calculate step 5 gmm data > [service]');

    const { riceTest } = body;
    const { 
      drySampleMass,           // A = Massa da amostra seca (2500)
      waterSampleContainerMass, // C = Massa do recipiente com água (7584.8)
      waterSampleMass,         // B = Massa do recipiente + amostra + água (9088.9)
      temperatureOfWater       // Fator de correção da temperatura (0.9973)
    } = riceTest;

    // ✅ VALIDAÇÃO DOS DADOS
    if (!drySampleMass || !waterSampleContainerMass || !waterSampleMass || !temperatureOfWater) {
      this.logger.error('Dados incompletos para cálculo do GMM');
      throw new Error('Todos os campos são obrigatórios para o cálculo');
    }

    // ✅ FÓRMULA CORRETA DO ENSAIO RICE TEST
    // Gmm = (Massa seca) / ((Massa seca + Massa recipiente com água) - Massa recipiente + amostra + água) × Fator de correção
    
    // 1. Calcula o volume deslocado
    const volumeDisplaced = (drySampleMass + waterSampleContainerMass) - waterSampleMass;
    
    // 2. Calcula a densidade sem correção
    const densityWithoutCorrection = drySampleMass / volumeDisplaced;
    
    // 3. Aplica correção de temperatura
    const gmm = densityWithoutCorrection * temperatureOfWater;

    // ✅ LOG PARA DEBUG
    this.logger.log({
      drySampleMass,
      waterSampleContainerMass,
      waterSampleMass,
      temperatureOfWater,
      volumeDisplaced,
      densityWithoutCorrection,
      gmm
    }, 'GMM Calculation Details');

    // ✅ VERIFICA SE O RESULTADO É VÁLIDO
    if (isNaN(gmm) || !isFinite(gmm)) {
      throw new Error('Cálculo resultou em valor inválido');
    }

    // ✅ ARREDONDA PARA 3 CASAS DECIMAIS (opcional)
    const roundedGmm = Math.round(gmm * 1000) / 1000;

    this.logger.log(`GMM calculado: ${roundedGmm}`);
    
    return roundedGmm;
  } catch (error) {
    this.logger.error('Erro no cálculo do GMM:', error);
    throw error;
  }
}
    async saveFirstCompressionData(body: any, userId: string) {
    try {
      this.logger.log('save superpave first compression step on first-compression.superpave.service.ts > [body]', {
        body,
      });

      const { name } = body.firstCompressionData;

      const superpaveExists: any = await this.superpaveRepository.findOne(name, userId);

      const { name: materialName, ...firstCompressionWithoutName } = body.firstCompressionData;

      const superpaveWithFirstCompression = {
        ...superpaveExists._doc,
        firstCompressionData: firstCompressionWithoutName,
      };

      await this.superpaveModel.updateOne({ _id: superpaveExists._doc._id }, superpaveWithFirstCompression);

      if (superpaveExists._doc.generalData.step < 6) {
        await this.superpaveRepository.saveStep(superpaveExists, 6);
      }

      return true;
    } catch (error) {
      throw error;
    }
  }
}
