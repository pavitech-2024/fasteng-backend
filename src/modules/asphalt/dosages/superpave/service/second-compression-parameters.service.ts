import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from 'infra/mongoose/database.config';
import { Model } from 'mongoose';
import { SuperpaveRepository } from '../repository';
import { Superpave, SuperpaveDocument } from '../schemas';

@Injectable()
export class SecondCompressionParameters_Superpave_Service {
  private logger = new Logger(SecondCompressionParameters_Superpave_Service.name);

  constructor(
    @InjectModel(Superpave.name, DATABASE_CONNECTION.ASPHALT)
    private superpaveModel: Model<SuperpaveDocument>,
    private readonly superpave_repository: SuperpaveRepository,
  ) {}

  async getStep9Data(body: any) {
    try {
      this;
      this.logger.log({}, 'start get step 8 Data > SecondCompressionPercentage_Superpave_Service');

      const { expectedPli, composition } = body;

      const PolynomialRegression = require('ml-regression-polynomial');
      const { quadSolver } = require('quadratic-solver');
      const Pli = expectedPli;
      const dataVv = [
        composition.halfLess.Vv,
        composition.normal.Vv,
        composition.halfPlus.Vv,
        composition.onePlus.Vv,
      ];
      const dataPli = [Pli - 0.5, Pli, Pli + 0.5, Pli + 1];
      const regression = new PolynomialRegression(dataPli, dataVv, 2);
      const optimumContent = quadSolver(
        regression.coefficients[2],
        regression.coefficients[1],
        regression.coefficients[0] - 4,
      )[1];
      const graphVv = [
        ['Teor', 'Vv'],
        [
          Pli - 0.5,
          regression.coefficients[2] * Math.pow(Pli - 0.5, 2) +
            regression.coefficients[1] * (Pli - 0.5) +
            regression.coefficients[0],
        ],
        [
          Pli,
          regression.coefficients[2] * Math.pow(Pli, 2) + regression.coefficients[1] * Pli + regression.coefficients[0],
        ],
        [
          Pli + 0.5,
          regression.coefficients[2] * Math.pow(Pli + 0.5, 2) +
            regression.coefficients[1] * (Pli + 0.5) +
            regression.coefficients[0],
        ],
        [
          Pli + 1,
          regression.coefficients[2] * Math.pow(Pli + 1, 2) +
            regression.coefficients[1] * (Pli + 1) +
            regression.coefficients[0],
        ],
      ];
      const graphVam = [
        ['Teor', 'Vam'],
        [Pli - 0.5, composition.halfLess.Vam],
        [Pli, composition.normal.Vam],
        [Pli + 0.5, composition.halfPlus.Vam],
        [Pli + 1, composition.onePlus.Vam],
      ];
      const graphGmb = [
        ['Teor', 'Gmb'],
        [Pli - 0.5, composition.halfLess.projectN.Gmb],
        [Pli, composition.normal.projectN.Gmb],
        [Pli + 0.5, composition.halfPlus.projectN.Gmb],
        [Pli + 1, composition.onePlus.projectN.Gmb],
      ];
      const graphGmm = [
        ['Teor', 'Gmm'],
        [Pli - 0.5, composition.halfLess.Gmm],
        [Pli, composition.normal.Gmm],
        [Pli + 0.5, composition.halfPlus.Gmm],
        [Pli + 1, composition.onePlus.Gmm],
      ];
      const graphRBV = [
        ['Teor', 'RBV'],
        [Pli - 0.5, composition.halfLess.RBV],
        [Pli, composition.normal.RBV],
        [Pli + 0.5, composition.halfPlus.RBV],
        [Pli + 1, composition.onePlus.RBV],
      ];
      const graphPA = [
        ['Teor', 'P/A'],
        [Pli - 0.5, composition.halfLess.ratioDustAsphalt],
        [Pli, composition.normal.ratioDustAsphalt],
        [Pli + 0.5, composition.halfPlus.ratioDustAsphalt],
        [Pli + 1, composition.onePlus.ratioDustAsphalt],
      ];
      let halfLessPointOfRT;
      let normalPointOfRT;
      let halfPlusPointOfRT;
      let onePlusPointOfRT;
      if (composition.halfLess.indirectTensileStrength !== undefined) {
        halfLessPointOfRT = composition.halfLess.indirectTensileStrength;
      } else halfLessPointOfRT = null;
      if (composition.normal.indirectTensileStrength !== undefined) {
        normalPointOfRT = composition.normal.indirectTensileStrength;
      } else normalPointOfRT = null;
      if (composition.halfPlus.indirectTensileStrength !== undefined) {
        halfPlusPointOfRT = composition.halfPlus.indirectTensileStrength;
      } else halfPlusPointOfRT = null;
      if (composition.onePlus.indirectTensileStrength !== undefined) {
        onePlusPointOfRT = composition.onePlus.indirectTensileStrength;
      } else onePlusPointOfRT = null;
      const graphRT = [
        ['Teor', 'RT'],
        [Pli - 0.5, halfLessPointOfRT],
        [Pli, normalPointOfRT],
        [Pli + 0.5, halfPlusPointOfRT],
        [Pli + 1, onePlusPointOfRT],
      ];

      const graphs = {
        graphVv,
        graphVam,
        graphGmb,
        graphGmm,
        graphRBV,
        graphPA,
        graphRT,
      };
      return { optimumContent, graphs };
    } catch (error) {
      throw error;
    }
  }
  
  async saveStep9Data(body: any, userId: string) {
    try {
      this.logger.log('save superpave second compression percentages step on second-compression-percentages.superpave.service.ts > [body]', { body });

      const { name } = body.secondCompressionParams;

      const superpaveExists: any = await this.superpave_repository.findOne(name, userId);

      const { name: materialName, ...secondCompressionParamsWithoutName } = body.secondCompressionParams;

      const superpaveWithSecondCompressionParams = { ...superpaveExists._doc, secondCompressionParams: secondCompressionParamsWithoutName };

      await this.superpaveModel.updateOne(
        { _id: superpaveExists._doc._id },
        superpaveWithSecondCompressionParams
      );

      if (superpaveExists._doc.generalData.step < 9) {
        await this.superpave_repository.saveStep(superpaveExists, 9);
      }

      return true;
    } catch (error) {
      throw error
    }
  }
}
