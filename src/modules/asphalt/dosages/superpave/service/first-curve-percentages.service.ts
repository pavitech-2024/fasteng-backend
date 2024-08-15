import { Injectable, Logger } from '@nestjs/common';
import { SuperpaveRepository } from '../repository';
import { InjectModel } from '@nestjs/mongoose';
import { DATABASE_CONNECTION } from 'infra/mongoose/database.config';
import { Model } from 'mongoose';
import { Superpave, SuperpaveDocument } from '../schemas';

@Injectable()
export class FirstCurvePercentages_Service {
  private logger = new Logger(FirstCurvePercentages_Service.name);

  constructor(
    @InjectModel(Superpave.name, DATABASE_CONNECTION.ASPHALT)
    private superpaveModel: Model<SuperpaveDocument>,
    private readonly superpave_repository: SuperpaveRepository,
  ) {}

  async getStep6Parameters(body: any) {
    try {
      this.logger.log({ body }, 'start calculate step 5 data > [service]');
      const {
        granulometryComposition,
        trafficVolume,
        nominalSize,
        turnNumber,
        chosenCurves,
        porcentagesPassantsN200,
        binderSpecificGravity,
        riceTest,
        maximumDensity,
        binderCompositions,
        percentageInputs,
      } = body;

      let expectedPorcentageGmmInitialN;
      let expectedPorcentageGmmProjectN;
      let expectedPorcentageGmmMaxN;
      let expectedVam;
      let expectedRBV_Higher;
      let expectedRBV_Lower;

      let updatedGranulometryComposition = {
        lower: {
          pli: null,
          gmm: null,
          data: [],
          percentWaterAbs: null,
          Vv: null,
          Vam: null,
          percentsOfDosage: percentageInputs,
          ratioDustAsphalt: null,
          projectN: {
            samplesData: [],
            percentageGmm: null,
          },
          maxN: {
            samplesData: [],
            percentageGmm: null,
          },
          initialN: {
            samplesData: [],
            percentageGmm: null,
          },
          expectedPli: null,
          gse: null,
          combinedGsb: null,
          Gmb: null
        },
        average: {
          pli: null,
          gmm: null,
          data: [],
          percentWaterAbs: null,
          Vv: null,
          Vam: null,
          percentsOfDosage: percentageInputs,
          ratioDustAsphalt: null,
          projectN: {
            samplesData: [],
            percentageGmm: null,
          },
          maxN: {
            samplesData: [],
            percentageGmm: null,
          },
          initialN: {
            samplesData: [],
            percentageGmm: null,
          },
          expectedPli: null,
          gse: null,
          combinedGsb: null,
          Gmb: null
        },
        higher: {
          pli: null,
          gmm: null,
          data: [],
          percentWaterAbs: null,
          Vv: null,
          Vam: null,
          percentsOfDosage: percentageInputs,
          ratioDustAsphalt: null,
          projectN: {
            samplesData: [],
            percentageGmm: null,
          },
          maxN: {
            samplesData: [],
            percentageGmm: null,
          },
          initialN: {
            samplesData: [],
            percentageGmm: null,
          },
          expectedPli: null,
          gse: null,
          combinedGsb: null,
          Gmb: null
        },
      };

      if (trafficVolume === 'high' || trafficVolume === 'medium-high') {
        expectedPorcentageGmmInitialN = 89;
        expectedPorcentageGmmProjectN = 96;
        expectedPorcentageGmmMaxN = 98;

        if (nominalSize.value === 37.5) expectedVam = 11;
        else if (nominalSize.value === 25) expectedVam = 12;
        else if (nominalSize.value === 19) expectedVam = 13;
        else if (nominalSize.value === 12.5) expectedVam = 14;
        else if (nominalSize.value === 9.5) expectedVam = 15;
        expectedRBV_Higher = 75;
        expectedRBV_Lower = 65;
      } else if (trafficVolume === 'medium') {
        expectedPorcentageGmmInitialN = 90.5;
        expectedPorcentageGmmProjectN = 96;
        expectedPorcentageGmmMaxN = 98;
        if (nominalSize.value === 37.5) expectedVam = 11;
        else if (nominalSize.value === 25) expectedVam = 12;
        else if (nominalSize.value === 19) expectedVam = 13;
        else if (nominalSize.value === 12.5) expectedVam = 14;
        else if (nominalSize.value === 9.5) expectedVam = 15;
        else expectedVam = 16;
        expectedRBV_Higher = 78;
        expectedRBV_Lower = 65;
      } else if (trafficVolume === 'low') {
        expectedPorcentageGmmInitialN = 90.5;
        expectedPorcentageGmmProjectN = null;
        expectedPorcentageGmmMaxN = null;
        expectedVam = null;
        expectedRBV_Higher = 80;
        expectedRBV_Lower = 70;
      }

      let initialNIndex = turnNumber.initialN - 1;
      let projectNIndex = turnNumber.projectN - 1;
      let maxNIndex = turnNumber.maxN - 1;

      let passantN200lower = 0;

      if (chosenCurves.lower) {
        updatedGranulometryComposition = {
          ...updatedGranulometryComposition,
          lower: {
            gmm: riceTest.find((e) => e.curve === 'lower').gmm,
            pli: binderCompositions[0].pli,
            data: [],
            percentWaterAbs: null,
            Vv: null,
            Vam: null,
            ratioDustAsphalt: null,
            percentsOfDosage: percentageInputs,
            projectN: {
              samplesData: [],
              percentageGmm: null,
            },
            maxN: {
              samplesData: [],
              percentageGmm: null,
            },
            initialN: {
              samplesData: [],
              percentageGmm: null,
            },
            expectedPli: null,
            gse: null,
            combinedGsb: null,
            Gmb: null
          },
        };

        updatedGranulometryComposition.lower.data = this.calculateExpectedGmb(granulometryComposition[0]);
        updatedGranulometryComposition.lower.data = this.calculateGmbCP(updatedGranulometryComposition.lower.data);

        updatedGranulometryComposition.lower.data = this.calculateGmb2(updatedGranulometryComposition.lower.data);

        updatedGranulometryComposition.lower.data = this.calculateC(granulometryComposition[0], maxNIndex);
        updatedGranulometryComposition.lower.data = this.calculateExpectedGmb_C(
          updatedGranulometryComposition.lower.data,
        );
        updatedGranulometryComposition.lower.data = this.calculatePercentageGmm(updatedGranulometryComposition.lower);
        updatedGranulometryComposition.lower.data = this.calculatePlanilhaVv(updatedGranulometryComposition.lower.data);
        updatedGranulometryComposition.lower.data = this.calculateVcb(updatedGranulometryComposition.lower);
        updatedGranulometryComposition.lower.data = this.calculateVam(updatedGranulometryComposition.lower.data);
        updatedGranulometryComposition.lower.data = this.calculateRbv(updatedGranulometryComposition.lower.data);

        updatedGranulometryComposition.lower.percentWaterAbs = this.percentageWaterAbsorbed(
          updatedGranulometryComposition.lower.data,
        );

        updatedGranulometryComposition.lower.initialN.samplesData = this.separateNValues(
          updatedGranulometryComposition.lower.data,
          initialNIndex,
        );

        updatedGranulometryComposition.lower.projectN.samplesData = this.separateNValues(
          updatedGranulometryComposition.lower.data,
          projectNIndex,
        );

        updatedGranulometryComposition.lower.maxN.samplesData = this.separateNValues(
          updatedGranulometryComposition.lower.data,
          maxNIndex,
        );

        updatedGranulometryComposition.lower.initialN.percentageGmm = this.calculateAveragePercentageGmm(
          updatedGranulometryComposition.lower.initialN.samplesData,
        );
        updatedGranulometryComposition.lower.projectN.percentageGmm = this.calculateAveragePercentageGmm(
          updatedGranulometryComposition.lower.projectN.samplesData,
        );
        updatedGranulometryComposition.lower.maxN.percentageGmm = this.calculateAveragePercentageGmm(
          updatedGranulometryComposition.lower.maxN.samplesData,
        );

        updatedGranulometryComposition.lower.Vv = this.calculateVv2(updatedGranulometryComposition.lower);

        updatedGranulometryComposition.lower.Vam = this.calculateAverageVAM(
          updatedGranulometryComposition.lower.projectN.samplesData,
        );

        // Formatar percentageinputs;
        let inputsValues = [];
        Object.values(percentageInputs[0]).forEach((e) => {
          inputsValues.push(Number(e));
        });

        updatedGranulometryComposition.lower.percentsOfDosage = inputsValues;

        for (let i = 0; i < porcentagesPassantsN200.length; i++) {
          if (porcentagesPassantsN200[i] === null) {
            porcentagesPassantsN200[i] = 0;
            passantN200lower +=
              (porcentagesPassantsN200[i] * updatedGranulometryComposition.lower.percentsOfDosage[i]) / 100;
          }
        }

        updatedGranulometryComposition.lower.ratioDustAsphalt =
          passantN200lower /
          ((-(100 - updatedGranulometryComposition.lower.pli) *
            binderSpecificGravity *
            (binderCompositions[0].gse - binderCompositions[0].combinedGsb)) /
            (binderCompositions[0].gse * binderCompositions[0].combinedGsb) +
            updatedGranulometryComposition.lower.pli);
      }

      let passantN200average = 0;

      if (chosenCurves.average) {
        updatedGranulometryComposition = {
          ...updatedGranulometryComposition,
          average: {
            gmm: riceTest.find((e) => e.curve === 'average').gmm,
            pli: binderCompositions[0].pli,
            data: [],
            percentWaterAbs: null,
            Vv: null,
            Vam: null,
            ratioDustAsphalt: null,
            percentsOfDosage: percentageInputs,
            projectN: {
              samplesData: [],
              percentageGmm: null,
            },
            maxN: {
              samplesData: [],
              percentageGmm: null,
            },
            initialN: {
              samplesData: [],
              percentageGmm: null,
            },
            expectedPli: null,
            gse: null,
            combinedGsb: null,
            Gmb: null
          },
        };

        updatedGranulometryComposition.average.data = this.calculateExpectedGmb(granulometryComposition[1]);
        updatedGranulometryComposition.average.data = this.calculateGmbCP(updatedGranulometryComposition.average.data);

        updatedGranulometryComposition.average.data = this.calculateGmb2(updatedGranulometryComposition.average.data);

        updatedGranulometryComposition.average.data = this.calculateC(granulometryComposition[1], maxNIndex);

        updatedGranulometryComposition.average.data = this.calculateExpectedGmb_C(
          updatedGranulometryComposition.average.data,
        );
        updatedGranulometryComposition.average.data = this.calculatePercentageGmm(
          updatedGranulometryComposition.average,
        );
        updatedGranulometryComposition.average.data = this.calculatePlanilhaVv(
          updatedGranulometryComposition.average.data,
        );
        updatedGranulometryComposition.average.data = this.calculateVcb(updatedGranulometryComposition.average);
        updatedGranulometryComposition.average.data = this.calculateVam(updatedGranulometryComposition.average.data);
        updatedGranulometryComposition.average.data = this.calculateRbv(updatedGranulometryComposition.average.data);

        updatedGranulometryComposition.average.percentWaterAbs = this.percentageWaterAbsorbed(
          updatedGranulometryComposition.average.data,
        );

        updatedGranulometryComposition.average.initialN.samplesData = this.separateNValues(
          updatedGranulometryComposition.average.data,
          initialNIndex,
        );

        updatedGranulometryComposition.average.projectN.samplesData = this.separateNValues(
          updatedGranulometryComposition.average.data,
          projectNIndex,
        );
        updatedGranulometryComposition.average.maxN.samplesData = this.separateNValues(
          updatedGranulometryComposition.average.data,
          maxNIndex,
        );

        updatedGranulometryComposition.average.initialN.percentageGmm = this.calculateAveragePercentageGmm(
          updatedGranulometryComposition.average.initialN.samplesData,
        );
        updatedGranulometryComposition.average.projectN.percentageGmm = this.calculateAveragePercentageGmm(
          updatedGranulometryComposition.average.projectN.samplesData,
        );
        updatedGranulometryComposition.average.maxN.percentageGmm = this.calculateAveragePercentageGmm(
          updatedGranulometryComposition.average.maxN.samplesData,
        );

        updatedGranulometryComposition.average.Vv = this.calculateVv2(updatedGranulometryComposition.average);

        updatedGranulometryComposition.average.Vam = this.calculateAverageVAM(
          updatedGranulometryComposition.average.projectN.samplesData,
        );

        // Formatar percentageinputs;
        let inputsValues = [];
        Object.values(percentageInputs[1]).forEach((e) => {
          inputsValues.push(Number(e));
        });

        updatedGranulometryComposition.average.percentsOfDosage = inputsValues;

        for (let i = 0; i < porcentagesPassantsN200.length; i++) {
          if (porcentagesPassantsN200[i] === null) {
            porcentagesPassantsN200[i] = 0;
            passantN200average +=
              (porcentagesPassantsN200[i] * updatedGranulometryComposition.average.percentsOfDosage[i]) / 100;
          }
        }

        updatedGranulometryComposition.average.ratioDustAsphalt =
          passantN200average /
          ((-(100 - updatedGranulometryComposition.average.pli) *
            binderSpecificGravity *
            (binderCompositions[0].gse - binderCompositions[0].combinedGsb)) /
            (binderCompositions[0].gse * binderCompositions[0].combinedGsb) +
            updatedGranulometryComposition.average.pli);
      }

      let passantN200higher = 0;

      if (chosenCurves.higher) {
        updatedGranulometryComposition = {
          ...updatedGranulometryComposition,
          higher: {
            gmm: riceTest.find((e) => e.curve === 'higher').gmm,
            pli: binderCompositions[0].pli,
            data: [],
            percentWaterAbs: null,
            Vv: null,
            Vam: null,
            ratioDustAsphalt: null,
            percentsOfDosage: percentageInputs,
            projectN: {
              samplesData: [],
              percentageGmm: null,
            },
            maxN: {
              samplesData: [],
              percentageGmm: null,
            },
            initialN: {
              samplesData: [],
              percentageGmm: null,
            },
            expectedPli: null,
            gse: null,
            combinedGsb: null,
            Gmb: null
          },
        };

        updatedGranulometryComposition.higher.data = this.calculateExpectedGmb(granulometryComposition[2]);
        updatedGranulometryComposition.higher.data = this.calculateGmbCP(updatedGranulometryComposition.higher.data);

        updatedGranulometryComposition.higher.data = this.calculateGmb2(updatedGranulometryComposition.higher.data);

        updatedGranulometryComposition.higher.data = this.calculateC(granulometryComposition[2], maxNIndex);

        updatedGranulometryComposition.higher.data = this.calculateExpectedGmb_C(
          updatedGranulometryComposition.higher.data,
        );
        updatedGranulometryComposition.higher.data = this.calculatePercentageGmm(
          updatedGranulometryComposition.higher,
        );
        updatedGranulometryComposition.higher.data = this.calculatePlanilhaVv(
          updatedGranulometryComposition.higher.data,
        );
        updatedGranulometryComposition.higher.data = this.calculateVcb(updatedGranulometryComposition.higher);
        updatedGranulometryComposition.higher.data = this.calculateVam(updatedGranulometryComposition.higher.data);
        updatedGranulometryComposition.higher.data = this.calculateRbv(updatedGranulometryComposition.higher.data);

        updatedGranulometryComposition.higher.percentWaterAbs = this.percentageWaterAbsorbed(
          updatedGranulometryComposition.higher.data,
        );

        updatedGranulometryComposition.higher.initialN.samplesData = this.separateNValues(
          updatedGranulometryComposition.higher.data,
          initialNIndex,
        );

        updatedGranulometryComposition.higher.projectN.samplesData = this.separateNValues(
          updatedGranulometryComposition.higher.data,
          projectNIndex,
        );
        updatedGranulometryComposition.higher.maxN.samplesData = this.separateNValues(
          updatedGranulometryComposition.higher.data,
          maxNIndex,
        );

        updatedGranulometryComposition.higher.initialN.percentageGmm = this.calculateAveragePercentageGmm(
          updatedGranulometryComposition.higher.initialN.samplesData,
        );
        updatedGranulometryComposition.higher.projectN.percentageGmm = this.calculateAveragePercentageGmm(
          updatedGranulometryComposition.higher.projectN.samplesData,
        );
        updatedGranulometryComposition.higher.maxN.percentageGmm = this.calculateAveragePercentageGmm(
          updatedGranulometryComposition.higher.maxN.samplesData,
        );

        updatedGranulometryComposition.higher.Vv = this.calculateVv2(updatedGranulometryComposition.higher);

        updatedGranulometryComposition.higher.Vam = this.calculateAverageVAM(
          updatedGranulometryComposition.higher.projectN.samplesData,
        );

        // Formatar percentageinputs;
        let inputsValues = [];
        Object.values(percentageInputs[2]).forEach((e) => {
          inputsValues.push(Number(e));
        });

        updatedGranulometryComposition.higher.percentsOfDosage = inputsValues;

        for (let i = 0; i < porcentagesPassantsN200.length; i++) {
          if (porcentagesPassantsN200[i] === null) {
            porcentagesPassantsN200[i] = 0;
            passantN200higher +=
              (porcentagesPassantsN200[i] * updatedGranulometryComposition.higher.percentsOfDosage[i]) / 100;
          }
        }

        updatedGranulometryComposition.higher.ratioDustAsphalt =
          passantN200higher /
          ((-(100 - updatedGranulometryComposition.higher.pli) *
            binderSpecificGravity *
            (binderCompositions[0].gse - binderCompositions[0].combinedGsb)) /
            (binderCompositions[0].gse * binderCompositions[0].combinedGsb) +
            updatedGranulometryComposition.higher.pli);
      }

      let table2Lower = {
        percentageGmmInitialN: {},
        percentageGmmProjectN: {},
        percentageGmmMaxN: {},
        porcentageVv: {},
        porcentageVam: {},
        specificMass: {},
        percentWaterAbs: {},
        ratioDustAsphalt: {},
      };

      let table3Lower = {};

      let table4Lower = {};

      if (chosenCurves.lower) {
        const expectedPliLower = updatedGranulometryComposition.lower.pli - 0.4 * (4 - updatedGranulometryComposition.lower.Vv);

        updatedGranulometryComposition.lower.expectedPli = expectedPliLower;

        let Clower;

        if (updatedGranulometryComposition.lower.Vv < 4) Clower = 0.1;
        else Clower = 0.2;

        const expectedVamLower = updatedGranulometryComposition.lower.Vam + Clower * (4 - updatedGranulometryComposition.lower.Vv);

        const expectedRBVLower = (expectedVamLower - 4) / expectedVamLower;

        const expectedPercentageGmmInitialNLower =
          updatedGranulometryComposition.lower.initialN.percentageGmm - 4 + updatedGranulometryComposition.lower.Vv;

        const expectedPercentageGmmMaxNLower =
          updatedGranulometryComposition.lower.maxN.percentageGmm - 4 + updatedGranulometryComposition.lower.Vv;

        const expectedRatioDustAsphaltLower =
          passantN200lower /
          ((-(100 - expectedPliLower) *
            binderSpecificGravity *
            (updatedGranulometryComposition.lower.gse - updatedGranulometryComposition.lower.combinedGsb)) /
            (updatedGranulometryComposition.lower.gse * updatedGranulometryComposition.lower.combinedGsb) +
            expectedPliLower);

        table2Lower = {
          percentageGmmInitialN: updatedGranulometryComposition.lower.initialN.percentageGmm,
          percentageGmmProjectN: updatedGranulometryComposition.lower.projectN.percentageGmm,
          percentageGmmMaxN: updatedGranulometryComposition.lower.maxN.percentageGmm,
          porcentageVv: updatedGranulometryComposition.lower.Vv,
          porcentageVam: updatedGranulometryComposition.lower.Vam,
          specificMass: updatedGranulometryComposition.lower.data[0].Gmb,
          percentWaterAbs: updatedGranulometryComposition.lower.percentWaterAbs,
          ratioDustAsphalt: updatedGranulometryComposition.lower.ratioDustAsphalt,
        };

        table3Lower = {
          expectedPliLower,
          expectedVamLower,
          expectedRBVLower,
          expectedRatioDustAsphaltLower,
          expectedPercentageGmmInitialNLower,
          expectedPercentageGmmMaxNLower,
        };

        let graphData = this.calculateGraphData(granulometryComposition[0]);

        table4Lower = {
          data: graphData,
        };
      }

      let table2Average = {
        percentageGmmInitialN: {},
        percentageGmmProjectN: {},
        percentageGmmMaxN: {},
        porcentageVv: {},
        porcentageVam: {},
        specificMass: {},
        percentWaterAbs: {},
        ratioDustAsphalt: {},
      };
      let table3Average = {};

      let table4Average = {};

      if (chosenCurves.average) {
        const expectedPliAverage = updatedGranulometryComposition.average.pli - 0.4 * (4 - updatedGranulometryComposition.average.Vv);

        updatedGranulometryComposition.average.expectedPli = expectedPliAverage;

        let Caverage;

        if (updatedGranulometryComposition.average.Vv < 4) Caverage = 0.1;
        else Caverage = 0.2;

        const expectedVamAverage = updatedGranulometryComposition.average.Vam + Caverage * (4 - updatedGranulometryComposition.average.Vv);

        const expectedRBVAverage = (expectedVamAverage - 4) / expectedVamAverage;

        const expectedPercentageGmmInitialNAverage =
          updatedGranulometryComposition.average.initialN.percentageGmm - 4 + updatedGranulometryComposition.average.Vv;

        const expectedPercentageGmmMaxNAverage =
          updatedGranulometryComposition.average.maxN.percentageGmm - 4 + updatedGranulometryComposition.average.Vv;

        const expectedRatioDustAsphaltAverage =
          passantN200average /
          ((-(100 - expectedPliAverage) *
            binderSpecificGravity *
            (updatedGranulometryComposition.average.gse - updatedGranulometryComposition.average.combinedGsb)) /
            (updatedGranulometryComposition.average.gse * updatedGranulometryComposition.average.combinedGsb) +
            expectedPliAverage);

        table2Average = {
          percentageGmmInitialN: updatedGranulometryComposition.average.initialN.percentageGmm,
          percentageGmmProjectN: updatedGranulometryComposition.average.projectN.percentageGmm,
          percentageGmmMaxN: updatedGranulometryComposition.average.maxN.percentageGmm,
          porcentageVv: updatedGranulometryComposition.average.Vv,
          porcentageVam: updatedGranulometryComposition.average.Vam,
          specificMass: updatedGranulometryComposition.average.data[0].Gmb,
          percentWaterAbs: updatedGranulometryComposition.average.percentWaterAbs,
          ratioDustAsphalt: updatedGranulometryComposition.average.ratioDustAsphalt,
        };

        table3Average = {
          expectedPliAverage,
          expectedVamAverage,
          expectedRBVAverage,
          expectedRatioDustAsphaltAverage,
          expectedPercentageGmmInitialNAverage,
          expectedPercentageGmmMaxNAverage,
        };

        let graphData = this.calculateGraphData(granulometryComposition[1]);

        table4Average = {
          data: graphData,
        };
      }

      let table2Higher = {
        percentageGmmInitialN: {},
        percentageGmmProjectN: {},
        percentageGmmMaxN: {},
        porcentageVv: {},
        porcentageVam: {},
        specificMass: {},
        percentWaterAbs: {},
        ratioDustAsphalt: {},
      };
      let table3Higher = {};

      let table4Higher = {};

      if (chosenCurves.higher) {
        const expectedPliHigher = updatedGranulometryComposition.higher.pli - 0.4 * (4 - updatedGranulometryComposition.higher.Vv);

        updatedGranulometryComposition.higher.expectedPli = expectedPliHigher;

        let Chigher;

        if (updatedGranulometryComposition.higher.Vv < 4) Chigher = 0.1;
        else Chigher = 0.2;

        const expectedVamHigher = updatedGranulometryComposition.higher.Vam + Chigher * (4 - updatedGranulometryComposition.higher.Vv);

        const expectedRBVHigher = (expectedVamHigher - 4) / expectedVamHigher;

        const expectedPercentageGmmInitialNHigher =
          updatedGranulometryComposition.higher.initialN.percentageGmm - 4 + updatedGranulometryComposition.higher.Vv;

        const expectedPercentageGmmMaxNHigher =
          updatedGranulometryComposition.higher.maxN.percentageGmm - 4 + updatedGranulometryComposition.higher.Vv;

        const expectedRatioDustAsphaltHigher =
          passantN200higher /
          ((-(100 - expectedPliHigher) *
            binderSpecificGravity *
            (updatedGranulometryComposition.higher.gse - updatedGranulometryComposition.higher.combinedGsb)) /
            (updatedGranulometryComposition.higher.gse * updatedGranulometryComposition.higher.combinedGsb) +
            expectedPliHigher);

        table2Higher = {
          percentageGmmInitialN: updatedGranulometryComposition.higher.initialN.percentageGmm,
          percentageGmmProjectN: updatedGranulometryComposition.higher.projectN.percentageGmm,
          percentageGmmMaxN: updatedGranulometryComposition.higher.maxN.percentageGmm,
          porcentageVv: updatedGranulometryComposition.higher.Vv,
          porcentageVam: updatedGranulometryComposition.higher.Vam,
          specificMass: updatedGranulometryComposition.higher.data[0].Gmb,
          percentWaterAbs: updatedGranulometryComposition.higher.percentWaterAbs,
          ratioDustAsphalt: updatedGranulometryComposition.higher.ratioDustAsphalt,
        };

        table3Higher = {
          expectedPliHigher,
          expectedVamHigher,
          expectedRBVHigher,
          expectedRatioDustAsphaltHigher,
          expectedPercentageGmmInitialNHigher,
          expectedPercentageGmmMaxNHigher,
        };

        let graphData = this.calculateGraphData(granulometryComposition[2]);

        table4Higher = {
          data: graphData,
        };
      }

      const returnScreen6 = {
        table1: {
          trafficVolume,
          nominalSize: nominalSize.value,
          expectedPorcentageGmmInitialN,
          expectedPorcentageGmmProjectN,
          expectedPorcentageGmmMaxN,
          expectedVam,
          expectedRBV_Higher,
          expectedRBV_Lower,
        },
        table2: {
          table2Lower,
          table2Average,
          table2Higher,
        },
        table3: {
          table3Lower,
          table3Average,
          table3Higher,
        },
        table4: {
          table4Lower,
          table4Average,
          table4Higher,
        },
      };

      return returnScreen6;
    } catch (error) {
      throw error;
    }
  }

  calculateExpectedGmb(data) {
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].planilha.length; j++) {
        data[i].planilha[j].GMBe =
          (data[i].dryMass / (Math.PI * Math.pow(data[i].diammeter / 2, 2) * data[i].planilha[j].Altura_mm)) * 1000;
      }
    }
    return data;
  }

  calculateGmbCP(data) {
    let updatedData = data;
    for (let i = 0; i < data.length; i++) {
      updatedData[i].Gmb = null;
      updatedData[i].Gmb =
        (Math.round((data[i].dryMass / (data[i].drySurfaceSaturatedMass - data[i].submergedMass)) * 1e3) / 1e3) *
        data[i].waterTemperatureCorrection;
    }
    return updatedData;
  }

  calculateC(data, maxNIndex) {
    let updatedData = [...data];

    for (let i = 0; i < data.length; i++) {
      updatedData[i].c = data[i].Gmb / data[i].planilha[maxNIndex].GMBe;
    }
    return updatedData;
  }

  calculateExpectedGmb_C(data) {
    let updatedData = [...data];

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].planilha.length; j++) {
        updatedData[i].planilha[j].GMBe_C = data[i].planilha[j].GMBe * data[i].c;
      }
    }
    return updatedData;
  }

  calculatePercentageGmm(curve) {
    let data = curve.data;
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].planilha.length; j++) {
        // data[i].planilha[j].percentageGmm = 100 * (data[i].planilha[j].GMBe_C / curve.gmm);
        if (curve.gmm === 0) {
          data[i].planilha[j].percentageGmm = 0;
        } else {
          data[i].planilha[j].percentageGmm = 100 * (data[i].planilha[j].GMBe_C / curve.gmm);
        }
      }
    }
    return data;
  }

  calculatePlanilhaVv(data) {
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].planilha.length; j++) {
        data[i].planilha[j].vv = 100 - data[i].planilha[j].percentageGmm;
      }
    }
    return data;
  }

  calculateVcb(curve) {
    let data = curve.data;
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].planilha.length; j++) {
        data[i].planilha[j].vcb = (data[i].planilha[j].GMBe * curve.pli) / 1.02;
      }
    }
    return data;
  }

  calculateVam(data) {
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].planilha.length; j++) {
        data[i].planilha[j].vam = data[i].planilha[j].vv + data[i].planilha[j].vcb;
      }
    }
    return data;
  }

  separateNValues(data, nIndex) {
    let samplesData = [];
    for (let i = 0; i < data.length; i++) {
      let planilha = data[i].planilha[nIndex];
      samplesData.push(planilha);
    }
    return samplesData;
  }

  calculateAveragePercentageGmm(data) {
    let sumGmm = 0;
    for (let i = 0; i < data.length; i++) {
      sumGmm += data[i].percentageGmm;
    }
    const pGmm = sumGmm / data.length;
    return pGmm;
  }

  calculateAverageVAM(data) {
    let sumVam = 0;
    for (let i = 0; i < data.length; i++) {
      sumVam += data[i].vam;
    }
    const vam = sumVam / data.length;
    return vam;
  }

  calculateGmb2(data) {
    let sumGmb = 0;
    let updatedData = [...data];

    for (let i = 0; i < data.length; i++) {
      sumGmb += updatedData[i].Gmb;
    }

    const Gmb = sumGmb / data.length;

    for (let i = 0; i < data.length; i++) {
      updatedData[i].Gmb = Gmb;
    }

    // return Gmb;
    return updatedData;
  }

  calculateRbv(data) {
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].planilha.length; j++) {
        data[i].planilha[j].rbv = (data[i].planilha[j].vcb / data[i].planilha[j].vam) * 100;
      }
    }
    return data;
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

  calculateVv2(curve) {
    let sumVv = 0;
    const data = curve.projectN.samplesData;
    for (let i = 0; i < data.length; i++) {
      sumVv += data[i].vv;
    }
    return sumVv / data.length;
  }
  

  calculateGraphData(data) {
    let graphData: any[] = [['Nº de Giros', 'Altura (mm)', '%Gmm (%)', 'Vv (%)']];

    for (let i = 0; i < data.length; i++) {
      let index = 1;
      data[i].planilha.forEach((element) => {
        let array = [];
        array.push(element.N_Giros);
        array.push(element.Altura_mm); //0
        array.push(element.percentageGmm); //1
        array.push(element.vv); //2
        if (graphData[index]) {
          let average = [];

          for (let j = 0; j < graphData[index].length; j++) {
            average.push((graphData[index][j] + array[j]) / 2);
          }
          graphData[index] = average;
        } else {
          graphData[index] = array;
        }
        index++;
      });
    }
    return graphData;
  }

  async saveStep6Data(body: any, userId: string) {
    try {
      this.logger.log('save superpave first curve percentages step on first-curve-percentages.superpave.service.ts > [body]', { body });

      const { name } = body.firstCurvePercentagesData;

      const superpaveExists: any = await this.superpave_repository.findOne(name, userId);

      const { name: materialName, ...firstCurvePercentagesWithoutName } = body.firstCurvePercentagesData;

      const superpaveWithFirstCurvePercentages = { ...superpaveExists._doc, firstCurvePercentagesData: firstCurvePercentagesWithoutName };

      await this.superpaveModel.updateOne(
        { _id: superpaveExists._doc._id },
        superpaveWithFirstCurvePercentages
      );

      if (superpaveExists._doc.generalData.step < 6) {
        await this.superpave_repository.saveStep(superpaveExists, 6);
      }

      return true;
    } catch (error) {
      throw error
    }
  }
}