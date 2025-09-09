import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { MarshallService } from '.';
import { Marshall, MarshallDocument } from '../schemas';
import { MarshallRepository } from '../repository';
import { DATABASE_CONNECTION } from '../../../../../infra/mongoose/database.config';
import { handleError } from 'utils/error-handler';
import { GraphicsUtil } from 'utils/services/graphics.util';
import { DNIT_BANDS_VOLUMETRIC } from 'utils/services/dnit-bands.constants';
import { CurveEquationsUtil } from 'utils/services/curve-equations.util';
import { MathCalculationsUtil } from 'utils/services/math-calculations.util';
import { DosageCalculationsUtil } from 'utils/services/dosage-calculations.util';
import { SaveVolumetricParametersRequestDTO } from '../dto/volumetric-params-data.dto';
import { GraphicsData } from '../types';
import { OptimumBinderDTO, GetExpectedParametersDTO,ExpectedParametersDTO } from '../dto/optinium-binder-content-data.dto';


@Injectable()
export class OptimumBinderContent_Marshall_Service {
  private logger = new Logger(MarshallService.name);

  constructor(
    @InjectModel(Marshall.name, DATABASE_CONNECTION.ASPHALT)
    private marshallModel: Model<MarshallDocument>,
    private readonly marshallRepository: MarshallRepository,
  ) {}

  async setOptimumBinderContentData(body: SaveVolumetricParametersRequestDTO): Promise<GraphicsData> {
    try {
      this.logger.log('set graphs on optimum-binder.marshall.service.ts', { body });

      const { volumetricParametersData } = body;
      const { volumetricParameters } = volumetricParametersData;

      const graphics = GraphicsUtil.createGraphicsStructure();
      GraphicsUtil.populateGraphicsData(graphics, volumetricParameters);

      return graphics;
    } catch (error) {
      handleError(error, 'Failed to set optimum binder content graphs.');
      throw error;
    }
  }

  async plotDosageGraph(
    dnitBands: string,
    volumetricParameters: { pointsOfCurveDosageRBV: number[][]; pointsOfCurveDosageVv: number[][] },
    binderTrial: number,
    percentsOfDosage: number[],
  ): Promise<OptimumBinderDTO> {
    try {
      this.logger.log('set dosage graph', { dnitBands, binderTrial });

      const { pointsOfCurveDosageRBV, pointsOfCurveDosageVv } = volumetricParameters;
      const band = DNIT_BANDS_VOLUMETRIC[dnitBands];

      const curveRBV = CurveEquationsUtil.calculateEquationRBV(pointsOfCurveDosageRBV.map(([x, y]) => ({ x, y })));

      const curveVv = CurveEquationsUtil.calculateEquationVv(pointsOfCurveDosageVv.map(([x, y]) => ({ x, y })));

      const pointsOfCurveDosage = [];
      const pushData = (asphaltContent: number) => {
        pointsOfCurveDosage.push([
          asphaltContent,
          CurveEquationsUtil.calculateVv(asphaltContent, curveVv) * 100,
          CurveEquationsUtil.calculateRBV(asphaltContent, curveRBV) * 100,
        ]);
      };

      [-1, -0.5, 0, 0.5, 1].forEach((increment) => pushData(binderTrial + increment));

      const optimumContent = MathCalculationsUtil.calculateVv4(
        binderTrial - 1,
        CurveEquationsUtil.calculateVv(binderTrial - 1, curveVv),
        binderTrial - 0.5,
        CurveEquationsUtil.calculateVv(binderTrial - 0.5, curveVv),
      );

      const confirmedPercentsOfDosage = DosageCalculationsUtil.confirmPercentsOfDosage(
        percentsOfDosage,
        optimumContent,
      );

      return {
        pointsOfCurveDosage,
        optimumContent,
        confirmedPercentsOfDosage,
        curveRBV,
        curveVv,
      };
    } catch (error) {
      handleError(error, 'Failed to set optimum binder dosage graph.');
      throw error;
    }
  }

  async getExpectedParameters(
  body: GetExpectedParametersDTO,
): Promise<ExpectedParametersDTO> {
    try {
      const {
        percentsOfDosage,
        optimumContent,
        maxSpecificGravity,
        listOfSpecificGravities,
        trial: trialAsphaltContent,
        confirmedPercentsOfDosage,
        curveVv,
        curveRBV,
      } = body;

      const formattedPercentsOfDosage: number[] = [];
      const ids1 = new Set();

      Object.keys(percentsOfDosage[0]).forEach((key) => {
        const id = key.split('_')[1];
        ids1.add(id);
        const value = percentsOfDosage[0][key];
        const index = Array.from(ids1).indexOf(id);
        formattedPercentsOfDosage[index] = value;
      });

      let newMaxSpecificGravity: number;

      if (maxSpecificGravity.method === 'GMM') {
        newMaxSpecificGravity = DosageCalculationsUtil.calculateMaxSpecificGravityGMM(
          maxSpecificGravity,
          trialAsphaltContent,
          optimumContent,
        );
      } else {
        newMaxSpecificGravity = DosageCalculationsUtil.calculateMaxSpecificGravityTraditional(
          formattedPercentsOfDosage,
          confirmedPercentsOfDosage,
          listOfSpecificGravities,
          optimumContent,
        );
      }

      const Vv = CurveEquationsUtil.calculateVv(optimumContent, curveVv);
      const Gmb = newMaxSpecificGravity * (1 - Vv);
      const Vcb = (Gmb * optimumContent) / 1.027;
      const RBV = CurveEquationsUtil.calculateRBV(optimumContent, curveRBV);
      const Vam = (Vv * 100 + Vcb) / 100;

      return { Vv, RBV, Vam, Gmb, newMaxSpecificGravity };
    } catch (error) {
      handleError(error, 'Failed to set optimum binder expected parameters.');
      throw error;
    }
  }

  async saveStep7Data(body: any, userId: string) {
    try {
      this.logger.log('save marshall optimum binder content step on optimum-binder.marshall.service.ts > [body]', {
        body,
      });

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
      handleError(error, 'saveStep7Data');
      throw error;
    }
  }
}
