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

  async calculateStep7RiceTest(body: any) {
    try {
      this.logger.log({ body }, 'start calculateStep7RiceTest > SecondCompression_Superpave_Service');

      const { sampleAirDryMass, containerMassWaterSample, containerWaterMass, waterTemperatureCorrection } = body;

      const gmm =
        (sampleAirDryMass / (sampleAirDryMass + containerWaterMass - containerMassWaterSample)) *
        waterTemperatureCorrection;

      return gmm;
    } catch (error) {
      throw error;
    }
  }

  async calculateStep7Gmm(body: any) {
    try {
      this.logger.log({ body }, 'start calculateStep7Gmm > SecondCompression_Superpave_Service');

      const { type, band, gmm } = body;

      // if (type === "granulometryComposition") {
      //   if (gmm.insert) this.result.granulometryComposition[band].gmm = gmm.value;
      //   else
      //     this.result.granulometryComposition[band].gmm = this.riceTest(
      //       gmm.massOfDrySample,
      //       gmm.massOfContainer_Water_Sample,
      //       gmm.massOfContainer_Water,
      //       gmm.cfValue,
      //     );
      //   return this.result.granulometryComposition[band].Gmm;
      // } else if (type === "choosenGranulometryComposition") {
      //   if (Gmm.insert)
      //     this.result.choosenGranulometryComposition.composition[band].Gmm =
      //       Gmm.value;
      //   else
      //     this.result.choosenGranulometryComposition.composition[band].Gmm =
      //       this.riceTest(
      //         Gmm.massOfDrySample,
      //         Gmm.massOfContainer_Water_Sample,
      //         Gmm.massOfContainer_Water,
      //         Gmm.cfValue,
      //       );
      //   return this.result.choosenGranulometryComposition.composition[band].Gmm;
      // } else if (type === "confirmGranulometryComposition") {
      //   if (Gmm.insert) this.result.confirmGranulometryComposition.Gmm = Gmm.value;
      //   else
      //     this.result.confirmGranulometryComposition.Gmm = this.riceTest(
      //       Gmm.massOfDrySample,
      //       Gmm.massOfContainer_Water_Sample,
      //       Gmm.massOfContainer_Water
      //     );
      //   return this.result.confirmGranulometryComposition.Gmm;
      // }
    } catch (error) {
      throw error;
    }
  }

  async calculateVolumetricParametersOfChoosenGranulometryComposition(body: any) {
    try {
      this.logger.log(
        { body },
        'start step 7 volumetric parameters of choosen granulometry composition > SecondCompression_Superpave_Service',
      );

      const { composition, binderSpecificGravity, porcentagesPassantsN200 } = body;

      const choosenGranulometryComposition = {
        composition: {
          halfLess: {
            projectN: {
              samplesData: null,
              gmb: null,
              percentWaterAbs: null,
              percentageGmm: null
            },
            specifiesMass: null,
            gmm: null,
            Vv: null,
            Vam: null,
            expectedPli: null,
            RBV: null,
            ratioDustAsphalt: null,
            indirectTensileStrength: null
          },
          normal: {
            projectN: {
              samplesData: null,
              gmb: null,
              percentWaterAbs: null,
              percentageGmm: null
            },
            specifiesMass: null,
            gmm: null,
            Vv: null,
            Vam: null,
            RBV: null,
            ratioDustAsphalt: null,
            indirectTensileStrength: null
          },
          halfPlus: {
            projectN: {
              samplesData: null,
              gmb: null,
              percentWaterAbs: null,
              percentageGmm: null
            },
            specifiesMass: null,
            gmm: null,
            Vv: null,
            Vam: null,
            RBV: null,
            ratioDustAsphalt: null,
            indirectTensileStrength: null
          },
          onePlus: {
            projectN: {
              samplesData: null,
              gmb: null,
              percentWaterAbs: null,
              percentageGmm: null
            },
            specifiesMass: null,
            gmm: null,
            Vv: null,
            Vam: null,
            RBV: null,
            ratioDustAsphalt: null,
            indirectTensileStrength: null
          },
        },
        expectedPli: null,
        combinedGsb: null,
        percentsOfDosage: [],
        Gse: null,
        ponderatedPercentsOfDosage: null
      }

      choosenGranulometryComposition.composition.halfLess.projectN.samplesData =
        composition.halfLess.projectN;
      choosenGranulometryComposition.composition.normal.projectN.samplesData = composition.normal.projectN;
      choosenGranulometryComposition.composition.halfPlus.projectN.samplesData =
        composition.halfPlus.projectN;
      choosenGranulometryComposition.composition.onePlus.projectN.samplesData =
        composition.onePlus.projectN;

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
      choosenGranulometryComposition.composition.halfLess.projectN.percentWaterAbs =
        this.percentageWaterAbsorbed(
          choosenGranulometryComposition.composition.halfLess.projectN.samplesData,
        );

      choosenGranulometryComposition.composition.normal.specifiesMass = this.calculateSpecifiesMass(
        choosenGranulometryComposition.composition.normal.projectN,
      );
      choosenGranulometryComposition.composition.normal.projectN.percentWaterAbs =
        this.percentageWaterAbsorbed(
          choosenGranulometryComposition.composition.normal.projectN.samplesData,
        );

      choosenGranulometryComposition.composition.halfPlus.specifiesMass = this.calculateSpecifiesMass(
        choosenGranulometryComposition.composition.halfPlus.projectN,
      );
      choosenGranulometryComposition.composition.halfPlus.projectN.percentWaterAbs =
        this.percentageWaterAbsorbed(
          choosenGranulometryComposition.composition.halfPlus.projectN.samplesData,
        );

      choosenGranulometryComposition.composition.onePlus.specifiesMass = this.calculateSpecifiesMass(
        choosenGranulometryComposition.composition.onePlus.projectN,
      );
      choosenGranulometryComposition.composition.onePlus.projectN.percentWaterAbs =
        this.percentageWaterAbsorbed(
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
        ((choosenGranulometryComposition.composition.normal.projectN.gmb *
          choosenGranulometryComposition.expectedPli) /
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
        passantN200 +=
          (porcentagesPassantsN200[i] * choosenGranulometryComposition.percentsOfDosage[i]) /
          100;
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
      for (
        let i = 0;
        i < choosenGranulometryComposition.composition.halfLess.projectN.samplesData.length;
        i++
      ) {
        if (
          choosenGranulometryComposition.composition.halfLess.projectN.samplesData[i]
            .indirectTensileStrength !== undefined
        ) {
          sumIndirectTensileStrength +=
            choosenGranulometryComposition.composition.halfLess.projectN.samplesData[i]
              .indirectTensileStrength;
          nIndirectTensileStrength++;
        }
      }
      if (nIndirectTensileStrength !== 0)
        choosenGranulometryComposition.composition.halfLess.indirectTensileStrength =
          sumIndirectTensileStrength / nIndirectTensileStrength;
      sumIndirectTensileStrength = 0;
      nIndirectTensileStrength = 0;
      for (
        let i = 0;
        i < choosenGranulometryComposition.composition.normal.projectN.samplesData.length;
        i++
      ) {
        if (
          choosenGranulometryComposition.composition.normal.projectN.samplesData[i]
            .indirectTensileStrength !== undefined
        ) {
          sumIndirectTensileStrength +=
            choosenGranulometryComposition.composition.normal.projectN.samplesData[i]
              .indirectTensileStrength;
          nIndirectTensileStrength++;
        }
      }
      if (nIndirectTensileStrength !== 0)
        choosenGranulometryComposition.composition.normal.indirectTensileStrength =
          sumIndirectTensileStrength / nIndirectTensileStrength;
      sumIndirectTensileStrength = 0;
      nIndirectTensileStrength = 0;
      for (
        let i = 0;
        i < choosenGranulometryComposition.composition.halfPlus.projectN.samplesData.length;
        i++
      ) {
        if (
          choosenGranulometryComposition.composition.halfPlus.projectN.samplesData[i]
            .indirectTensileStrength !== undefined
        ) {
          sumIndirectTensileStrength +=
            choosenGranulometryComposition.composition.halfPlus.projectN.samplesData[i]
              .indirectTensileStrength;
          nIndirectTensileStrength++;
        }
      }
      if (nIndirectTensileStrength !== 0)
        choosenGranulometryComposition.composition.halfPlus.indirectTensileStrength =
          sumIndirectTensileStrength / nIndirectTensileStrength;
      sumIndirectTensileStrength = 0;
      nIndirectTensileStrength = 0;
      for (
        let i = 0;
        i < choosenGranulometryComposition.composition.onePlus.projectN.samplesData.length;
        i++
      ) {
        if (
          choosenGranulometryComposition.composition.onePlus.projectN.samplesData[i]
            .indirectTensileStrength !== undefined
        ) {
          sumIndirectTensileStrength +=
            choosenGranulometryComposition.composition.onePlus.projectN.samplesData[i]
              .indirectTensileStrength;
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

  calculateSpecifiesMass(curve) {
    return curve.Gmb;
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

  calculateVv(curve) {
    return (1 - curve.projectN.Gmb / curve.Gmm) * 100;
  };
}
