import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from 'infra/mongoose/database.config';
import { Model } from 'mongoose';
import { SuperpaveRepository } from '../repository';
import { Superpave, SuperpaveDocument } from '../schemas';

@Injectable()
export class SecondCompression_Superpave_Service {
  private logger = new Logger(SecondCompression_Superpave_Service.name);

  constructor(
    @InjectModel(Superpave.name, DATABASE_CONNECTION.ASPHALT)
    private superpaveModel: Model<SuperpaveDocument>,
    private readonly superpaveRepository: SuperpaveRepository,
  ) {}

  calculateStep7RiceTest(
    sampleAirDryMass: number,
    containerMassWaterSample: number,
    containerWaterMass: number,
    waterTemperatureCorrection: number,
  ) {
    try {
      this.logger.log({}, 'start calculateStep7RiceTest > SecondCompression_Superpave_Service');

      const gmm =
        (sampleAirDryMass / (sampleAirDryMass + containerWaterMass - containerMassWaterSample)) *
        waterTemperatureCorrection;

      return gmm as any;
    } catch (error) {
      throw error;
    }
  }

  calculateStep7Gmm(gmm: any) {
    try {
      this.logger.log({}, 'start calculateStep7Gmm > SecondCompression_Superpave_Service');

      let gmmValue = [];

      for (let i = 0; i < gmm.length; i++) {
        if (gmm[i].insertedGmm) {
          gmmValue.push(gmm[i].insertedGmm);
        } else {
          const value = this.calculateStep7RiceTest(
            gmm.massOfDrySample,
            gmm.massOfContainer_Water_Sample,
            gmm.massOfContainer_Water,
            gmm.waterTemperatureCorrection,
          );

          gmmValue.push(value);
        }
      }

      return gmmValue;
    } catch (error) {
      throw error;
    }
  }

  async calculateSecondCompressionData(body: any) {
    try {
      this.logger.log({ body }, 'start calculating the second compression data > SecondCompression_Superpave_Service');

      const {
        composition,
        binderSpecificGravity,
        porcentagesPassantsN200,
        maximumDensities: gmm,
        expectedPli,
        combinedGsb,
        percentsOfDosage,
        Gse,
      } = body;

      const choosenGranulometryComposition = {
        composition: {
          halfLess: {
            projectN: {
              samplesData: null,
              gmb: null,
              percentWaterAbs: null,
              percentageGmm: null,
            },
            specifiesMass: null,
            gmm: null,
            Vv: null,
            Vam: null,
            expectedPli: null,
            RBV: null,
            ratioDustAsphalt: null,
            indirectTensileStrength: null,
          },
          normal: {
            projectN: {
              samplesData: null,
              gmb: null,
              percentWaterAbs: null,
              percentageGmm: null,
            },
            specifiesMass: null,
            gmm: null,
            Vv: null,
            Vam: null,
            RBV: null,
            ratioDustAsphalt: null,
            indirectTensileStrength: null,
          },
          halfPlus: {
            projectN: {
              samplesData: null,
              gmb: null,
              percentWaterAbs: null,
              percentageGmm: null,
            },
            specifiesMass: null,
            gmm: null,
            Vv: null,
            Vam: null,
            RBV: null,
            ratioDustAsphalt: null,
            indirectTensileStrength: null,
          },
          onePlus: {
            projectN: {
              samplesData: null,
              gmb: null,
              percentWaterAbs: null,
              percentageGmm: null,
            },
            specifiesMass: null,
            gmm: null,
            Vv: null,
            Vam: null,
            RBV: null,
            ratioDustAsphalt: null,
            indirectTensileStrength: null,
          },
        },
        expectedPli,
        combinedGsb,
        percentsOfDosage,
        Gse,
        ponderatedPercentsOfDosage: null,
      };

      const gmmValues = this.calculateStep7Gmm(gmm);

      choosenGranulometryComposition.composition.halfLess.gmm = gmmValues[0];
      choosenGranulometryComposition.composition.halfPlus.gmm = gmmValues[1];
      choosenGranulometryComposition.composition.normal.gmm = gmmValues[2];
      choosenGranulometryComposition.composition.onePlus.gmm = gmmValues[3];

      choosenGranulometryComposition.composition.halfLess.projectN.samplesData = composition.halfLess;

      choosenGranulometryComposition.composition.normal.projectN.samplesData = composition.normal;

      choosenGranulometryComposition.composition.halfPlus.projectN.samplesData = composition.halfPlus;

      choosenGranulometryComposition.composition.onePlus.projectN.samplesData = composition.onePlus;

      choosenGranulometryComposition.composition.halfLess.projectN.gmb = this.calculateGmb3(
        choosenGranulometryComposition.composition.halfLess.projectN.samplesData,
      );
      choosenGranulometryComposition.composition.normal.projectN.gmb = this.calculateGmb3(
        choosenGranulometryComposition.composition.normal.projectN.samplesData,
      );
      choosenGranulometryComposition.composition.halfPlus.projectN.gmb = this.calculateGmb3(
        choosenGranulometryComposition.composition.halfPlus.projectN.samplesData,
      );
      choosenGranulometryComposition.composition.onePlus.projectN.gmb = this.calculateGmb3(
        choosenGranulometryComposition.composition.onePlus.projectN.samplesData,
      );

      choosenGranulometryComposition.composition.halfLess.specifiesMass = this.calculateSpecifiesMass(
        choosenGranulometryComposition.composition.halfLess.projectN,
      );
      choosenGranulometryComposition.composition.halfLess.projectN.percentWaterAbs = this.percentageWaterAbsorbed(
        choosenGranulometryComposition.composition.halfLess.projectN.samplesData,
      );

      choosenGranulometryComposition.composition.normal.specifiesMass = this.calculateSpecifiesMass(
        choosenGranulometryComposition.composition.normal.projectN,
      );
      choosenGranulometryComposition.composition.normal.projectN.percentWaterAbs = this.percentageWaterAbsorbed(
        choosenGranulometryComposition.composition.normal.projectN.samplesData,
      );

      choosenGranulometryComposition.composition.halfPlus.specifiesMass = this.calculateSpecifiesMass(
        choosenGranulometryComposition.composition.halfPlus.projectN,
      );
      choosenGranulometryComposition.composition.halfPlus.projectN.percentWaterAbs = this.percentageWaterAbsorbed(
        choosenGranulometryComposition.composition.halfPlus.projectN.samplesData,
      );

      choosenGranulometryComposition.composition.onePlus.specifiesMass = this.calculateSpecifiesMass(
        choosenGranulometryComposition.composition.onePlus.projectN,
      );
      choosenGranulometryComposition.composition.onePlus.projectN.percentWaterAbs = this.percentageWaterAbsorbed(
        choosenGranulometryComposition.composition.onePlus.projectN.samplesData,
      );

      choosenGranulometryComposition.composition.halfLess.projectN.percentageGmm =
        (choosenGranulometryComposition.composition.halfLess.projectN.gmb * 100) /
        choosenGranulometryComposition.composition.halfLess.gmm;

      choosenGranulometryComposition.composition.normal.projectN.percentageGmm =
        (choosenGranulometryComposition.composition.normal.projectN.gmb * 100) /
        choosenGranulometryComposition.composition.normal.gmm;

      choosenGranulometryComposition.composition.halfPlus.projectN.percentageGmm =
        (choosenGranulometryComposition.composition.halfPlus.projectN.gmb * 100) /
        choosenGranulometryComposition.composition.halfPlus.gmm;

      choosenGranulometryComposition.composition.onePlus.projectN.percentageGmm =
        (choosenGranulometryComposition.composition.onePlus.projectN.gmb * 100) /
        choosenGranulometryComposition.composition.onePlus.gmm;

      choosenGranulometryComposition.composition.halfLess.Vv = this.calculateVv(
        choosenGranulometryComposition.composition.halfLess,
      );

      choosenGranulometryComposition.composition.normal.Vv = this.calculateVv(
        choosenGranulometryComposition.composition.normal,
      );
      choosenGranulometryComposition.composition.halfPlus.Vv = this.calculateVv(
        choosenGranulometryComposition.composition.halfPlus,
      );
      choosenGranulometryComposition.composition.onePlus.Vv = this.calculateVv(
        choosenGranulometryComposition.composition.onePlus,
      );

      choosenGranulometryComposition.composition.halfLess.Vam =
        100 -
        (choosenGranulometryComposition.composition.halfLess.projectN.percentageGmm *
          choosenGranulometryComposition.composition.halfLess.gmm *
          (1 - (choosenGranulometryComposition.expectedPli - 0.5) / 100)) /
          choosenGranulometryComposition.combinedGsb;

      choosenGranulometryComposition.composition.normal.Vam =
        100 -
        (choosenGranulometryComposition.composition.normal.projectN.percentageGmm *
          choosenGranulometryComposition.composition.normal.gmm *
          (1 - choosenGranulometryComposition.expectedPli / 100)) /
          choosenGranulometryComposition.combinedGsb;

      choosenGranulometryComposition.composition.halfPlus.Vam =
        100 -
        (choosenGranulometryComposition.composition.halfPlus.projectN.percentageGmm *
          choosenGranulometryComposition.composition.halfPlus.gmm *
          (1 - (choosenGranulometryComposition.expectedPli + 0.5) / 100)) /
          choosenGranulometryComposition.combinedGsb;

      choosenGranulometryComposition.composition.onePlus.Vam =
        100 -
        (choosenGranulometryComposition.composition.onePlus.projectN.percentageGmm *
          choosenGranulometryComposition.composition.onePlus.gmm *
          (1 - (choosenGranulometryComposition.expectedPli + 1) / 100)) /
          choosenGranulometryComposition.combinedGsb;

      choosenGranulometryComposition.composition.halfLess.RBV =
        100 *
        ((choosenGranulometryComposition.composition.halfLess.projectN.gmb *
          (choosenGranulometryComposition.expectedPli - 0.5)) /
          (choosenGranulometryComposition.composition.halfLess.Vam * binderSpecificGravity));

      choosenGranulometryComposition.composition.normal.RBV =
        100 *
        ((choosenGranulometryComposition.composition.normal.projectN.gmb * choosenGranulometryComposition.expectedPli) /
          (choosenGranulometryComposition.composition.normal.Vam * binderSpecificGravity));

      choosenGranulometryComposition.composition.halfPlus.RBV =
        100 *
        ((choosenGranulometryComposition.composition.halfPlus.projectN.gmb *
          (choosenGranulometryComposition.expectedPli + 0.5)) /
          (choosenGranulometryComposition.composition.halfPlus.Vam * binderSpecificGravity));

      choosenGranulometryComposition.composition.onePlus.RBV =
        100 *
        ((choosenGranulometryComposition.composition.onePlus.projectN.gmb *
          (choosenGranulometryComposition.expectedPli + 1)) /
          (choosenGranulometryComposition.composition.onePlus.Vam * binderSpecificGravity));

      let passantN200 = 0;
      for (let i = 0; i < porcentagesPassantsN200.length; i++) {
        passantN200 += (porcentagesPassantsN200[i] * choosenGranulometryComposition.percentsOfDosage[i]) / 100;
      }

      choosenGranulometryComposition.composition.halfLess.ratioDustAsphalt =
        passantN200 /
        ((-(100 - (choosenGranulometryComposition.expectedPli - 0.5)) *
          binderSpecificGravity *
          (choosenGranulometryComposition.Gse - choosenGranulometryComposition.combinedGsb)) /
          (choosenGranulometryComposition.Gse * choosenGranulometryComposition.combinedGsb) +
          choosenGranulometryComposition.expectedPli);

      choosenGranulometryComposition.composition.normal.ratioDustAsphalt =
        passantN200 /
        ((-(100 - choosenGranulometryComposition.expectedPli) *
          binderSpecificGravity *
          (choosenGranulometryComposition.Gse - choosenGranulometryComposition.combinedGsb)) /
          (choosenGranulometryComposition.Gse * choosenGranulometryComposition.combinedGsb) +
          choosenGranulometryComposition.expectedPli);

      choosenGranulometryComposition.composition.halfPlus.ratioDustAsphalt =
        passantN200 /
        ((-(100 - (choosenGranulometryComposition.expectedPli + 0.5)) *
          binderSpecificGravity *
          (choosenGranulometryComposition.Gse - choosenGranulometryComposition.combinedGsb)) /
          (choosenGranulometryComposition.Gse * choosenGranulometryComposition.combinedGsb) +
          choosenGranulometryComposition.expectedPli);

      choosenGranulometryComposition.composition.onePlus.ratioDustAsphalt =
        passantN200 /
        ((-(100 - (choosenGranulometryComposition.expectedPli + 1)) *
          binderSpecificGravity *
          (choosenGranulometryComposition.Gse - choosenGranulometryComposition.combinedGsb)) /
          (choosenGranulometryComposition.Gse * choosenGranulometryComposition.combinedGsb) +
          choosenGranulometryComposition.expectedPli);

      let sumIndirectTensileStrength = 0;
      let nIndirectTensileStrength = 0;


      for (let i = 0; i < choosenGranulometryComposition.composition.halfLess.projectN.samplesData.length; i++) {
        if (
          choosenGranulometryComposition.composition.halfLess.projectN.samplesData[i].diametralTractionResistance !==
          undefined
        ) {
          sumIndirectTensileStrength +=
            choosenGranulometryComposition.composition.halfLess.projectN.samplesData[i].diametralTractionResistance;
          nIndirectTensileStrength++;
        }
      }

      if (nIndirectTensileStrength !== 0)
        choosenGranulometryComposition.composition.halfLess.indirectTensileStrength =
          sumIndirectTensileStrength / nIndirectTensileStrength;

      sumIndirectTensileStrength = 0;
      nIndirectTensileStrength = 0;

      for (let i = 0; i < choosenGranulometryComposition.composition.normal.projectN.samplesData.length; i++) {
        if (
          choosenGranulometryComposition.composition.normal.projectN.samplesData[i].diametralTractionResistance !==
          undefined
        ) {
          sumIndirectTensileStrength +=
            choosenGranulometryComposition.composition.normal.projectN.samplesData[i].diametralTractionResistance;
          nIndirectTensileStrength++;
        }
      }

      if (nIndirectTensileStrength !== 0)
        choosenGranulometryComposition.composition.normal.indirectTensileStrength =
          sumIndirectTensileStrength / nIndirectTensileStrength;

      sumIndirectTensileStrength = 0;
      nIndirectTensileStrength = 0;

      for (let i = 0; i < choosenGranulometryComposition.composition.halfPlus.projectN.samplesData.length; i++) {
        if (
          choosenGranulometryComposition.composition.halfPlus.projectN.samplesData[i].diametralTractionResistance !==
          undefined
        ) {
          sumIndirectTensileStrength +=
            choosenGranulometryComposition.composition.halfPlus.projectN.samplesData[i].diametralTractionResistance;
          nIndirectTensileStrength++;
        }
      }

      if (nIndirectTensileStrength !== 0) 
        choosenGranulometryComposition.composition.halfPlus.indirectTensileStrength =
          sumIndirectTensileStrength / nIndirectTensileStrength;

      sumIndirectTensileStrength = 0;
      nIndirectTensileStrength = 0;

      for (let i = 0; i < choosenGranulometryComposition.composition.onePlus.projectN.samplesData.length; i++) {
        if (
          choosenGranulometryComposition.composition.onePlus.projectN.samplesData[i].diametralTractionResistance !==
          undefined
        ) {
          sumIndirectTensileStrength +=
            choosenGranulometryComposition.composition.onePlus.projectN.samplesData[i].diametralTractionResistance;
          nIndirectTensileStrength++;
        }
      }

      if (nIndirectTensileStrength !== 0)
        choosenGranulometryComposition.composition.onePlus.indirectTensileStrength =
          sumIndirectTensileStrength / nIndirectTensileStrength;

      const PolynomialRegression = require('ml-regression-polynomial');
      const { quadSolver } = require('quadratic-solver');
      const Pli = choosenGranulometryComposition.expectedPli;

      const dataVv = [
        choosenGranulometryComposition.composition.halfLess.Vv,
        choosenGranulometryComposition.composition.normal.Vv,
        choosenGranulometryComposition.composition.halfPlus.Vv,
        choosenGranulometryComposition.composition.onePlus.Vv,
      ];

      const dataPli = [Pli - 0.5, Pli, Pli + 0.5, Pli + 1];
      const regression = new PolynomialRegression(dataPli, dataVv, 2);

      const optimumContent = quadSolver(
        regression.coefficients[2],
        regression.coefficients[1],
        regression.coefficients[0] - 4,
      )[1];

      const ponderatedPercentsOfDosage = choosenGranulometryComposition.percentsOfDosage.map(
        (percent) => ((100 - optimumContent) * percent) / 100,
      );

      choosenGranulometryComposition.ponderatedPercentsOfDosage = ponderatedPercentsOfDosage;

      return choosenGranulometryComposition;
    } catch (error) {
      throw error;
    }
  }

  calculateGmb3(data) {
    data = this.calculateGmbCP(data);
    const Gmb = this.calculateGmb2(data);
    return Gmb;
  }

  // Densidade relativa aparente da mistura asfática (Gmb)
  calculateGmbCP(data) {
    for (let i = 0; i < data.length; i++) {
      const denominator = data[i].drySurfaceSaturatedMass - data[i].submergedMass;

      // Verifica se o denominador é 0 ou muito pequeno (evita divisão por 0)
      if (Math.abs(denominator) < 1e-6) {
        data[i].gmb = 0;
        continue;
      }

      const gmb = (Math.round((data[i].dryMass / denominator) * 1e3) / 1e3) * data[i].waterTemperatureCorrection;

      data[i].gmb = gmb;
    }
    return data;
  }

  calculateGmb2(data) {
    let sumGmb = 0;

    for (let i = 0; i < data.length; i++) {
      sumGmb += data[i].gmb;
    }

    const Gmb = sumGmb / data.length;
    return Gmb;
  }

  calculateSpecifiesMass(curve) {
    return curve.gmb;
  }

  // percentageWaterAbsorbed(data) {
  //   // a porcentagem de água absorvida que é = 100(sss-mse)/(sss-msu);

  //   const [averageDryMass, averageSubmergedMass, averageSaturedMass] = this.calculateMassMedia(data);
  //   const percentWaterAbs = (100 * (averageSaturedMass - averageDryMass)) / (averageSaturedMass - averageSubmergedMass);
  //   return percentWaterAbs;
  // }
  percentageWaterAbsorbed(data) {
    const [averageDryMass, averageSubmergedMass, averageSaturedMass] = this.calculateMassMedia(data);

    // Verifica se todos os valores são números válidos
    const isValid = [averageDryMass, averageSubmergedMass, averageSaturedMass].every(
      (val) => typeof val === 'number' && !isNaN(val),
    );

    const denominator = averageSaturedMass - averageSubmergedMass;

    if (!isValid || Math.abs(denominator) < 1e-6) {
      return 0;
    }

    const percentWaterAbs = (100 * (averageSaturedMass - averageDryMass)) / denominator;
    return percentWaterAbs;
  }

  calculateMassMedia(data) {
    let sumDryMass = 0;
    let sumSubmergedMass = 0;
    let saturatedMass = 0;

    for (let i = 0; i < data.length; i++) {
      sumDryMass += data[i].dryMass;
      sumSubmergedMass += data[i].submergedMass;
      saturatedMass += data[i].drySurfaceSaturatedMass;
    }

    const averageDryMass = sumDryMass / data.length;
    const averageSubmergedMass = sumSubmergedMass / data.length;
    const averageSaturedMass = saturatedMass / data.length;

    return [averageDryMass, averageSubmergedMass, averageSaturedMass];
  }

  calculateVv(curve) {
    const vv = (1 - curve.projectN.gmb / curve.gmm) * 100;
    return vv;
  }

  async saveSecondCompressionData(body: any, userId: string) {
    try {
      this.logger.log(
        'save superpave second compression data step on second-compression-data.superpave.service.ts > [body]',
        { body },
      );

      const { name } = body.secondCompressionData;

      const superpaveExists: any = await this.superpaveRepository.findOne(name, userId);

      const { name: materialName, ...secondCompressionWithoutName } = body.secondCompressionData;

      const superpaveWithSecondCompression = {
        ...superpaveExists._doc,
        secondCompressionData: secondCompressionWithoutName,
      };

      await this.superpaveModel.updateOne({ _id: superpaveExists._doc._id }, superpaveWithSecondCompression);

      if (superpaveExists._doc.generalData.step < 8) {
        await this.superpaveRepository.saveStep(superpaveExists, 8);
      }

      return true;
    } catch (error) {
      throw error;
    }
  }
}
