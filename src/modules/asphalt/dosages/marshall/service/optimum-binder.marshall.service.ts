import { Injectable, Logger } from '@nestjs/common';
import { MarshallService } from './marshall.service';
import { InjectModel } from '@nestjs/mongoose';
import { Marshall, MarshallDocument } from '../schemas';
import { DATABASE_CONNECTION } from '../../../../../infra/mongoose/database.config';
import { Model } from 'mongoose';
import { MarshallRepository } from '../repository';

@Injectable()
export class OptimumBinderContent_Marshall_Service {
  private logger = new Logger(MarshallService.name);

  constructor(
    @InjectModel(Marshall.name, DATABASE_CONNECTION.ASPHALT)
    private marshallModel: Model<MarshallDocument>,
    private readonly marshallRepository: MarshallRepository
  ) {}

  async setOptimumBinderContentData(body) {
    this.logger.log('set graphs on optimum-binder.marshall.service.ts > [body]', {
      body,
    });
    try {
      const { volumetricParametersData } = body;
      const { volumetricParameters } = volumetricParametersData;


      const graphics = {
        rbv: [['Teor', 'Rbv']],
        vv: [['Teor', 'Vv']],
        sg: [['Teor', 'SpecificGravity']],
        gmb: [['Teor', 'Gmb']],
        stability: [['Teor', 'Stability']],
        vam: [['Teor', 'Vam']],
      };

      volumetricParameters.forEach(({ asphaltContent, values }) => {
        graphics.rbv.push([asphaltContent, values.ratioBitumenVoid * 100]);
        graphics.vv.push([asphaltContent, values.volumeVoids * 100]);
        graphics.sg.push([asphaltContent, values.maxSpecificGravity]);
        graphics.gmb.push([asphaltContent, values.apparentBulkSpecificGravity]);
        graphics.stability.push([asphaltContent, values.stability]);
        graphics.vam.push([asphaltContent, values.aggregateVolumeVoids * 100]);
      });

      return graphics;
    } catch (error) {
      throw new Error('Failed to set optimum binder content graphs.');
    }
  }

  async plotDosageGraph(dnitBands: string, volumetricParameters: any, binderTrial: any, percentsOfDosage: number[]) {
    try {
      this.logger.log('set dosage graph on optimum-binder.marshall.service.ts > [body]', {
        dnitBands,
        volumetricParameters,
        binderTrial,
      });

      const { pointsOfCurveDosageRBV, pointsOfCurveDosageVv } = volumetricParameters;
      const trialAsphaltContent = binderTrial;

      const pointsOfCurveDosage = [];
      let minBandVv;
      let maxBandVv;
      let minBandRBV;
      let maxBandRBV;

      if (dnitBands === 'A') {
        minBandVv = 0.04;
        maxBandVv = 0.6;
        minBandRBV = 0.65;
        maxBandRBV = 0.72;
      } else if (dnitBands === 'B' || dnitBands === 'C') {
        minBandVv = 0.03;
        maxBandVv = 0.5;
        minBandRBV = 0.75;
        maxBandRBV = 0.82;
      }

      const curveRBV = this.calculateEquationRBV(pointsOfCurveDosageRBV);
      const curveVv = this.calculateEquationVv(pointsOfCurveDosageVv);

      const pushData = (asphaltContent: number) => {
        pointsOfCurveDosage.push([
          asphaltContent,
          this.calculateVv(asphaltContent, curveVv) * 100,
          this.calculateRBV(asphaltContent, curveRBV) * 100,
        ]);
      };

      [-1, -0.5, 0, 0.5, 1].forEach((increment) => pushData(trialAsphaltContent + increment));

      // Teor ótimo de ligante
      const optimumContent = this.calculateVv4(
        trialAsphaltContent - 1,                              // x1 
        this.calculateVv(trialAsphaltContent - 1, curveVv),   // y1
        trialAsphaltContent - 0.5,                            // x2 
        this.calculateVv(trialAsphaltContent - 0.5, curveVv), // y2
      );

      const confirmedPercentsOfDosage = await this.confirmPercentsOfDosage(percentsOfDosage, optimumContent)

      return {
        pointsOfCurveDosage,
        optimumContent,
        confirmedPercentsOfDosage,
        curveRBV,
        curveVv
      };
    } catch (error) {
      throw new Error('Failed to set optimum binder dosage graph.');
    }
  }

  async confirmPercentsOfDosage(percentageInputs: any[], optimumContent: number): Promise<any> {
    const ids1 = new Set();
    const percentsOfDosage = []

    Object.keys(percentageInputs[0]).forEach(key => {
      const id = key.split('_')[1];
      ids1.add(id);
      const value = percentageInputs[0][key];
      const index = Array.from(ids1).indexOf(id);
      percentsOfDosage[index] = value;
    });
    
    const confirmedPercentsOfDosage = percentsOfDosage.map(percent => (100 - optimumContent) * (percent / 100));

    return confirmedPercentsOfDosage
  }

  async getExpectedParameters(body: any) {
    try {
      const { 
        percentsOfDosage, // Porcentagem de cada agregado na composição granulometrica
        optimumContent, // Conteúdo ótimo de ligante
        maxSpecificGravity,
        listOfSpecificGravities,
        trial: trialAsphaltContent,
        confirmedPercentsOfDosage,
        curveVv,
        curveRBV
      } = body;

      let newMaxSpecificGravity;

      let formattedPercentsOfDosage = [];

      const ids1 = new Set();

      Object.keys(percentsOfDosage[0]).forEach(key => {
        const id = key.split('_')[1];
        ids1.add(id);
        const value = percentsOfDosage[0][key];
        const index = Array.from(ids1).indexOf(id);
        formattedPercentsOfDosage[index] = value;
      });
  
      if (maxSpecificGravity.method === 'GMM') {
  
        const GMMs = [
          maxSpecificGravity.result.lessOne,
          maxSpecificGravity.result.lessHalf,
          maxSpecificGravity.result.normal,
          maxSpecificGravity.result.plusHalf,
          maxSpecificGravity.result.plusOne,
        ];
  
        const Contents = [
          trialAsphaltContent - 1,
          trialAsphaltContent - 0.5,
          trialAsphaltContent,
          trialAsphaltContent + 0.5,
          trialAsphaltContent + 1,
        ];
  
        const data = GMMs.map((gmm, i) => {
          if (gmm) return { x: Contents[i], y: gmm };
          else return;
        });
  
        const coefficients = this.calculateEquation(data);
  
        newMaxSpecificGravity = coefficients.a * optimumContent + coefficients.b;
      } else {
        const denominator = formattedPercentsOfDosage.reduce(
          (acc, percent, i) => (acc += confirmedPercentsOfDosage[i] / listOfSpecificGravities[i]),
          0,
        );
        newMaxSpecificGravity = 100 / (denominator + (optimumContent / 1.03));
      }
  
      const Vv = this.calculateVv(optimumContent, curveVv);
      const Gmb = newMaxSpecificGravity * (1 - Vv);
      let Vcb = (Gmb * optimumContent) / 1.027;
      const RBV = this.calculateRBV(optimumContent, curveRBV);
      const Vam = (Vv * 100 + Vcb) / 100;
  
      return { Vv, RBV, Vam, Gmb, newMaxSpecificGravity };
    } catch (error) {
      throw new Error('Failed to set optimum binder expected parameters.');
    }
  }

  calculateContentVv(y: number, curveVv) {
    return (y - curveVv.b) / curveVv.a;
  }

  calculateContentRBV(y: number, curveRBV) {
    return (y - curveRBV.b) / curveRBV.a;
  }

  calculateVv(x: number, curveVv) {
    return curveVv.a * x + curveVv.b;
  }

  calculateRBV(x: number, curveRBV) {
    return curveRBV.a * x + curveRBV.b;
  }

  calculateEquationVv(data: any[]) {
    let curveVv = { a: null, b: null };

    curveVv.a =
      (data.length * this.sumXY(data) - this.sumX(data) * this.sumY(data)) /
      (data.length * this.sumPow2X(data) - this.Pow2SumX(data));
    curveVv.b = this.yBar(data) - curveVv.a * this.xBar(data);

    return curveVv;
  }

  calculateEquationRBV(data: any[]) {

    let curveRBV = { a: null, b: null };

    curveRBV.a =
      (data.length * this.sumXY(data) - this.sumX(data) * this.sumY(data)) /
      (data.length * this.sumPow2X(data) - this.Pow2SumX(data));
    curveRBV.b = this.yBar(data) - curveRBV.a * this.xBar(data);

    return curveRBV;
  }

  calculateEquation(data: any[]) {
    const a =
      (data.length * this.sumXY(data) - this.sumX(data) * this.sumY(data)) /
      (data.length * this.sumPow2X(data) - this.Pow2SumX(data));
    const b = this.yBar(data) - a * this.xBar(data);
    return { a, b };
  }

  calculateVv4(x1: number, y1: number, x2: number, y2: number) {
    const m = (y2 - y1) / (x2 - x1);
    return ((0.04 - y1) / m) + x1;
  }

  private sumXY(data: { x: number; y: number }[]) {
    return data.reduce((acc, obj) => {
      return acc + obj.x * obj.y;
    }, 0);
  }  

  private sumX(data: { x: number; y: number }[]) {
    return data.reduce((acc, obj) => acc + obj.x, 0);
  }
  
  private sumY(data: { x: number; y: number }[]) {
    return data.reduce((acc, obj) => acc + obj.y, 0);
  }
  
  private sumPow2X(data: { x: number; y: number }[]) {
    return data.reduce((acc, obj) => acc + Math.pow(obj.x, 2), 0);
  }
  
  private Pow2SumX(data: { x: number; y: number }[]) {
    const sumX = this.sumX(data);
    return Math.pow(sumX, 2);
  }
  
  private yBar(data: { x: number; y: number }[]) {
    const sumY = this.sumY(data);
    return sumY / data.length;
  }
  
  private xBar(data: { x: number; y: number }[]) {
    const sumX = this.sumX(data);
    return sumX / data.length;
  }

  async saveStep7Data(body: any, userId: string) {
    try {
      this.logger.log(
        'save marshall optimum binder content step on optimum-binder.marshall.service.ts > [body]',
        {
          body,
        },
      );

      const { name } = body.optimumBinderContentData;

      const marshallExists: any = await this.marshallRepository.findOne(name, userId);

      const { name: materialName, ...optimumBinderContentWithoutName } = body.optimumBinderContentData;

      const marshallWithOptimumBinderContent = {
        ...marshallExists._doc,
        optimumBinderContentData: optimumBinderContentWithoutName,
      };

      await this.marshallModel.updateOne({ _id: marshallExists._doc._id }, marshallWithOptimumBinderContent);

      if (marshallExists._doc.generalData.step < 7) {
        await this.marshallRepository.saveStep(marshallExists, 7);
      }

      return true;
    } catch (error) {
      throw error;
    }
  }
}
