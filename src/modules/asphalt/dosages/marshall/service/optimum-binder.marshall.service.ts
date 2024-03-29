import { Injectable, Logger } from "@nestjs/common";
import { MarshallService } from ".";
import { InjectModel } from "@nestjs/mongoose";
import { Marshall, MarshallDocument } from "../schemas";
import { DATABASE_CONNECTION } from "infra/mongoose/database.config";
import { Model } from "mongoose";


@Injectable()
export class OptimumBinderContent_Marshall_Service {
  private logger = new Logger(MarshallService.name)

  constructor(
    @InjectModel(Marshall.name, DATABASE_CONNECTION.ASPHALT)
    private marshallModel: Model<MarshallDocument>
  ){}

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

  async plotDosageGraph(
    //trialAsphaltContent: number,
    dnitBands: string,
    volumetricParameters: any,
    binderTrial: any,
  ) {

    const { pointsOfCurveDosageRBV, pointsOfCurveDosageVv } = volumetricParameters;
    const { tenors, trial: trialAsphaltContent } = binderTrial;

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

    const curveRBV = this.calculateEquationRBV(tenors);
    const curveVv = this.calculateEquationVv(tenors);

    const pushData = (asphaltContent: number) => {
      pointsOfCurveDosage.push([
        asphaltContent,
        this.calculateVv(asphaltContent, curveVv) * 100,
        this.calculateRBV(asphaltContent, curveRBV) * 100,
      ]);
    };

    [-1, -0.5, 0, 0.5, 1].forEach((increment) => pushData(trialAsphaltContent + increment));

    const optimumContent = this.calculateVv4(
      trialAsphaltContent - 1,
      this.calculateVv(trialAsphaltContent - 1, curveVv),
      trialAsphaltContent - 0.5,
      this.calculateVv(trialAsphaltContent - 0.5, curveRBV)
    );

    return {
      pointsOfCurveDosage,
      optimumContent,
    };
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

  private sumXY(data: any[]) {
    return data.reduce((acc, val) => acc + val[0] * val[1], 0);
  }

  private sumX(data: any[]) {
    return data.reduce((acc, val) => acc + val[0], 0);
  }

  private sumY(data: any[]) {
    return data.reduce((acc, val) => acc + val[1], 0);
  }

  private sumPow2X(data: any[]) {
    return data.reduce((acc, val) => acc + Math.pow(val[0], 2), 0);
  }

  private Pow2SumX(data: any[]) {
    return Math.pow(this.sumX(data), 2);
  }

  private yBar(data: any[]) {
    return this.sumY(data) / data.length;
  }

  private xBar(data: any[]) {
    return this.sumX(data) / data.length;
  }
}