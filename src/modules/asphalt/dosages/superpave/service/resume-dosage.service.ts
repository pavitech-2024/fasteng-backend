import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from 'infra/mongoose/database.config';
import { Model } from 'mongoose';
import { SuperpaveRepository } from '../repository';
import { Superpave, SuperpaveDocument } from '../schemas';

@Injectable()
export class ResumeDosage_Superpave_Service {
  private logger = new Logger(ResumeDosage_Superpave_Service.name);

  constructor(
    @InjectModel(Superpave.name, DATABASE_CONNECTION.ASPHALT)
    private superpaveModel: Model<SuperpaveDocument>,
    private readonly superpave_repository: SuperpaveRepository,
  ) {}

  // async calculateDosageEquation(data: any) {
  //   try {
  //     this.logger.log({}, 'start resume doage > [service]');

  //     const a =
  //       (data.length * this.sumXY(data) - this.sumX(data) * this.sumY(data)) /
  //       (data.length * this.sumPow2X(data) - this.Pow2SumX(data));
  //     const b = this.yBar(data) - a * this.xBar(data);
  //     const determinationCoeficient =
  //       this.pow2XLessXBarDotY(data) / (this.xLessXBarPow2(data) * this.yLessYBarPow2(data));
  //     return { a, b };
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // sumXY = (data) => data.reduce((acc, point) => (acc += point.x * point.y), 0);

  // sumX = (data) => data.reduce((acc, point) => (acc += point.x), 0);

  // sumY = (data) => data.reduce((acc, point) => (acc += point.y), 0);

  // sumPow2X = (data) => data.reduce((acc, point) => (acc += Math.pow(point.x, 2)), 0);

  // Pow2SumX = (data) =>
  //   Math.pow(
  //     data.reduce((acc, point) => (acc += point.x), 0),
  //     2,
  //   );

  // yBar = (data) => data.reduce((acc, point) => (acc += point.y), 0) / data.length;

  // xBar = (data) => data.reduce((acc, point) => (acc += point.x), 0) / data.length;

  // pow2XLessXBarDotY = (data) => {
  //   const xbar = this.xBar(data);
  //   return Math.pow(
  //     data.reduce((acc, point) => (acc += (point.x - xbar) * point.y), 0),
  //     2,
  //   );
  // };

  // xLessXBarPow2 = (data) => {
  //   const xbar = this.xBar(data);
  //   return data.reduce((acc, point) => (acc += Math.pow(point.x - xbar, 2)), 0);
  // };

  // yLessYBarPow2 = (data) => {
  //   const ybar = this.yBar(data);
  //   return data.reduce((acc, point) => acc += Math.pow((point.y - ybar), 2), 0);
  // };

  calculateVolumetricParametersOfConfirmGranulometryComposition(
    body
  ) {

    const {
      samplesData,
      optimumContent,
      choosenGranulometryComposition,
      binderSpecificGravity,
      listOfSpecificGravities,
      porcentagesPassantsN200,
    } = body;

    const confirmGranulometryComposition = {
      ponderatedPercentsOfDosage: null,
      samplesData,
      Gmb: null,
      Vv: null,
      Gmm: null,
      percentWaterAbs: null,
      specifiesMass: null,
      Vam: null,
      RBV: null,
      quantitative: null,
      indirectTensileStrength: null,
      ratioDustAsphalt: null
    }

    const ponderatedPercentsOfDosage =
      choosenGranulometryComposition.percentsOfDosage.map(
        (percent) => ((100 - optimumContent) * percent) / 100
      );

    confirmGranulometryComposition.ponderatedPercentsOfDosage =
      ponderatedPercentsOfDosage;

    confirmGranulometryComposition.samplesData = samplesData;

    confirmGranulometryComposition.Gmb =
      this.calculateGmb3(samplesData);

    confirmGranulometryComposition.Vv =
      1 -
      confirmGranulometryComposition.Gmb /
      confirmGranulometryComposition.Gmm;

    confirmGranulometryComposition.percentWaterAbs =
      this.percentageWaterAbsorbed(samplesData);

    confirmGranulometryComposition.specifiesMass =
      confirmGranulometryComposition.Gmb;

    confirmGranulometryComposition.Vam =
      confirmGranulometryComposition.Vv +
      (confirmGranulometryComposition.Gmb *
        optimumContent) /
      binderSpecificGravity;

    confirmGranulometryComposition.RBV =
      (confirmGranulometryComposition.Gmb *
        optimumContent) /
      binderSpecificGravity /
      confirmGranulometryComposition.Vam;

    const gmm = confirmGranulometryComposition.Gmm;

    confirmGranulometryComposition.quantitative =
      ponderatedPercentsOfDosage.map(
        (percent, i) =>
          (gmm * percent * 10) /
          1000 /
          listOfSpecificGravities[i].bulk
      );

    confirmGranulometryComposition.quantitative.unshift(
      gmm * optimumContent * 10
    );

    let sumIndirectTensileStrength = 0;

    let nIndirectTensileStrength = 0;

    for (let i = 0; i < samplesData.length; i++) {
      if (samplesData[i].indirectTensileStrength !== undefined) {
        sumIndirectTensileStrength += samplesData[i].indirectTensileStrength;
        nIndirectTensileStrength++;
      }
    }

    if (nIndirectTensileStrength !== 0) {
      confirmGranulometryComposition.indirectTensileStrength =
        sumIndirectTensileStrength / nIndirectTensileStrength;
    }

    let passantN200 = 0;

    for (let i = 0; i < porcentagesPassantsN200.length; i++) {
      passantN200 +=
        (porcentagesPassantsN200[i] *
          choosenGranulometryComposition.percentsOfDosage[i]) /
        100;
    }

    confirmGranulometryComposition.ratioDustAsphalt =
      passantN200 /
      ((-(100 - optimumContent) *
        binderSpecificGravity *
        (choosenGranulometryComposition.Gse -
          choosenGranulometryComposition.combinedGsb)) /
        (choosenGranulometryComposition.Gse *
          choosenGranulometryComposition.combinedGsb) +
        optimumContent);

    return confirmGranulometryComposition;
  };

  calculateGmb3(data) {
    data = this.calculateGmbCP(data);
    const Gmb = this.calculateGmb2(data);
    return Gmb;
  };

  calculateGmbCP(data) {
    for (let i = 0; i < data.length; i++) {
      data[i].Gmb = (Math.round((data[i].dryMass / (data[i].saturatedMass - data[i].submergedMass)) * 1e3) / 1e3) * data[i].correctionFactor;
    }
    return data;
  }

  calculateGmb2(data) {
    let sumGmb = 0;
  
    for (let i = 0; i < data.length; i++) {
      sumGmb += data[i].Gmb;
    }
  
    const Gmb = (sumGmb / data.length);
    return Gmb;
  };

  percentageWaterAbsorbed(data) {
    // a porcentagem de água absorvida que é = 100(sss-mse)/(sss-msu);

    const [averageDryMass, averageSubmergedMass, averageSaturedMass] =
      this.calculateMassMedia(data);
    const percentWaterAbs =
      (100 * (averageSaturedMass - averageDryMass)) /
      (averageSaturedMass - averageSubmergedMass);
    return percentWaterAbs;
  };

  calculateMassMedia(
    data
  ) {
    let sumDryMass = 0;
    let sumSubmergedMass = 0;
    let saturatedMass = 0;
  
    for (let i = 0; i < data.length; i++) {
      sumDryMass += data[i].dryMass;
      sumSubmergedMass += data[i].submergedMass;
      saturatedMass += data[i].saturatedMass;
    }
  
    const averageDryMass = sumDryMass / data.length;
    const averageSubmergedMass = sumSubmergedMass / data.length;
    const averageSaturedMass = saturatedMass / data.length;
  
    return [averageDryMass, averageSubmergedMass, averageSaturedMass];
  };
}
