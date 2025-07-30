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

  riceTest(massOfDrySample, containerSampleWaterMass, containerWaterMass, temperatureOfWater = 1.0) {
    return (massOfDrySample / (massOfDrySample + containerWaterMass - containerSampleWaterMass)) * temperatureOfWater;
  }

  calculateStep9RiceTest(body) {
    const { gmm, riceTest } = body;

    let gmmValue;

    if (gmm) gmmValue = gmm;
    else
      gmmValue = this.riceTest(
        riceTest.sampleAirDryMass,
        riceTest.containerSampleWaterMass,
        riceTest.containerWaterMass,
      );
    return gmmValue;
  }

  calculateDosageResumeEquation(body) {
    const {
      samplesData,
      optimumContent,
      choosenGranulometryComposition,
      binderSpecificGravity,
      listOfSpecificGravities,
      porcentagesPassantsN200,
      gmm: gmmValue,
    } = body;

    const confirmGranulometryComposition = {
      ponderatedPercentsOfDosage: null,
      samplesData,
      Gmb: null,
      Vv: null,
      Gmm: parseFloat(gmmValue.replace(',', '.')),
      percentWaterAbs: null,
      specifiesMass: null,
      Vam: null,
      RBV: null,
      quantitative: null,
      diametralTractionResistance: null,
      ratioDustAsphalt: null,
    };

    const isNumber = !isNaN(Number(optimumContent));
    const optimumContentFormatted = isNumber ? optimumContent : 0;

    const ponderatedPercentsOfDosage = choosenGranulometryComposition.percentsOfDosage.map(
      (percent) => ((100 - optimumContentFormatted) * percent) / 100,
    );

    confirmGranulometryComposition.ponderatedPercentsOfDosage = ponderatedPercentsOfDosage;

    confirmGranulometryComposition.samplesData = samplesData;

    confirmGranulometryComposition.Gmb = this.calculateGmb3(samplesData);

    confirmGranulometryComposition.Vv = 1 - confirmGranulometryComposition.Gmb / confirmGranulometryComposition.Gmm;

    confirmGranulometryComposition.percentWaterAbs = this.percentageWaterAbsorbed(samplesData);

    confirmGranulometryComposition.specifiesMass = confirmGranulometryComposition.Gmb;

    confirmGranulometryComposition.Vam =
      confirmGranulometryComposition.Vv + (confirmGranulometryComposition.Gmb * optimumContent) / binderSpecificGravity;

    confirmGranulometryComposition.RBV =
      (confirmGranulometryComposition.Gmb * optimumContent) /
      binderSpecificGravity /
      confirmGranulometryComposition.Vam;

    const gmm = confirmGranulometryComposition.Gmm;

    confirmGranulometryComposition.quantitative = ponderatedPercentsOfDosage.map(
      (percent, i) => (gmm * percent * 10) / 1000 / listOfSpecificGravities[i].realSpecificMass,
    );

    confirmGranulometryComposition.quantitative.unshift(gmm * optimumContent * 10);

    let sumdiametralTractionResistance = 0;

    let ndiametralTractionResistance = 0;

    for (let i = 0; i < samplesData.length; i++) {
      if (samplesData[i].diametralTractionResistance !== undefined) {
        sumdiametralTractionResistance += samplesData[i].diametralTractionResistance;
        ndiametralTractionResistance++;
      }
    }

    if (ndiametralTractionResistance !== 0) {
      confirmGranulometryComposition.diametralTractionResistance =
        sumdiametralTractionResistance / ndiametralTractionResistance;
    }

    let passantN200 = 0;

    for (let i = 0; i < porcentagesPassantsN200.length; i++) {
      passantN200 += (porcentagesPassantsN200[i] * choosenGranulometryComposition.percentsOfDosage[i]) / 100;
    }

    confirmGranulometryComposition.ratioDustAsphalt =
      passantN200 /
      ((-(100 - optimumContent) *
        binderSpecificGravity *
        (choosenGranulometryComposition.Gse - choosenGranulometryComposition.combinedGsb)) /
        (choosenGranulometryComposition.Gse * choosenGranulometryComposition.combinedGsb) +
        optimumContent);

    return confirmGranulometryComposition;
  }

  calculateGmb3(data) {
    data = this.calculateGmbCP(data);
    const Gmb = this.calculateGmb2(data);
    return Gmb;
  }

  calculateGmbCP(data) {
    for (let i = 0; i < data.length; i++) {
      data[i].Gmb =
        (Math.round((data[i].dryMass / (data[i].drySurfaceSaturatedMass - data[i].submergedMass)) * 1e3) / 1e3) *
        data[i].waterTemperatureCorrection;
    }
    return data;
  }

  calculateGmb2(data) {
    let sumGmb = 0;

    for (let i = 0; i < data.length; i++) {
      sumGmb += data[i].Gmb;
    }

    const Gmb = sumGmb / data.length;
    return Gmb;
  }

  percentageWaterAbsorbed(data) {
    // a porcentagem de água absorvida que é = 100(sss-mse)/(sss-msu);

    const [averageDryMass, averageSubmergedMass, averageSaturedMass] = this.calculateMassMedia(data);
    const percentWaterAbs = (100 * (averageSaturedMass - averageDryMass)) / (averageSaturedMass - averageSubmergedMass);
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

  async saveStep11Data(body: any, userId: string) {
    try {
      this.logger.log('save superpave vonfirm compression step on resume-dosage.superpave.service.ts > [body]', {
        body,
      });

      const { name } = body.confirmationCompressionData;

      const superpaveExists: any = await this.superpave_repository.findOne(name, userId);

      const { name: materialName, ...confirmationCompressionDataWithoutName } = body.confirmationCompressionData;

      const superpaveWithConfirmationCompressionData = {
        ...superpaveExists._doc,
        confirmationCompressionData: confirmationCompressionDataWithoutName,
      };

      await this.superpaveModel.updateOne({ _id: superpaveExists._doc._id }, superpaveWithConfirmationCompressionData);

      if (superpaveExists._doc.generalData.step < 11) {
        await this.superpave_repository.saveStep(superpaveExists, 11);
      }

      return true;
    } catch (error) {
      throw error;
    }
  }

  async saveSuperpaveDosage(body: any, userId: string) {
    try {
      this.logger.log('save superpave dosage on resume-dosage.superpave.service.ts > [body]', { body });

      const { name } = body.dosageResume;

      const superpaveExists: any = await this.superpave_repository.findOne(name, userId);

      const { name: materialName, ...superpaveDosageWithoutName } = body.dosageResume;

      const superpaveWithResumeDosage = { ...superpaveExists._doc, dosageResume: superpaveDosageWithoutName };

      await this.superpaveModel.updateOne({ _id: superpaveExists._doc._id }, superpaveWithResumeDosage);

      if (superpaveExists._doc.generalData.step < 10) {
        await this.superpave_repository.saveStep(superpaveExists, 10);
      }

      return true;
    } catch (error) {
      throw error;
    }
  }
}
