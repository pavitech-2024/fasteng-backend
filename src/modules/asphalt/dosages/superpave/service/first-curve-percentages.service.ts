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

  async getStep5Parameters(body: any) {
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
        percentageInputs
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
            percentageGmm: null
          },
          maxN: {
            samplesData: [],
            percentageGmm: null
          },
          initialN: {
            samplesData: [],
            percentageGmm: null
          }
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
        expectedRBV_Higher = 78;
        expectedRBV_Lower = 65;
      } else if (trafficVolume === 'VeryLight') {
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
              percentageGmm: null
            },
            maxN: {
              samplesData: [],
              percentageGmm: null
            },
            initialN: {
              samplesData: [],
              percentageGmm: null
            }
          },
        };

        updatedGranulometryComposition.lower.data = this.calculateExpectedGmb(granulometryComposition[0]);
        updatedGranulometryComposition.lower.data = this.calculateGmbCP(updatedGranulometryComposition.lower.data);

        updatedGranulometryComposition.lower.data = this.calculateGmb2(updatedGranulometryComposition.lower.data);

        updatedGranulometryComposition.lower.data = this.calculateC(granulometryComposition[0], maxNIndex);
        updatedGranulometryComposition.lower.data = this.calculateExpectedGmb_C(updatedGranulometryComposition.lower.data);
        updatedGranulometryComposition.lower.data = this.calculatePercentageGmm(updatedGranulometryComposition.lower);
        updatedGranulometryComposition.lower.data = this.calculatePlanilhaVv(updatedGranulometryComposition.lower.data);
        updatedGranulometryComposition.lower.data = this.calculateVcb(updatedGranulometryComposition.lower);
        updatedGranulometryComposition.lower.data = this.calculateVam(updatedGranulometryComposition.lower.data);
        updatedGranulometryComposition.lower.data = this.calculateRbv(updatedGranulometryComposition.lower.data);

        updatedGranulometryComposition.lower.percentWaterAbs = this.percentageWaterAbsorbed(updatedGranulometryComposition.lower.data);

        // updatedGranulometryComposition.lower.samplesData = updatedGranulometryComposition.lower;

        updatedGranulometryComposition.lower.initialN.samplesData = this.separateNValues(
          updatedGranulometryComposition.lower.data,
          initialNIndex,
        );

        updatedGranulometryComposition.lower.projectN.samplesData = this.separateNValues(
          updatedGranulometryComposition.lower.data,
          projectNIndex,
        );

        updatedGranulometryComposition.lower.maxN.samplesData = this.separateNValues(updatedGranulometryComposition.lower.data, maxNIndex);

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
          inputsValues.push(Number(e))
        })

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
        granulometryComposition.average.Gmm = granulometryComposition.average.Gmm;
        granulometryComposition.average.Pli = granulometryComposition.average.Pli;

        granulometryComposition.average.data = this.calculateExpectedGmb(granulometryComposition.average.data);
        granulometryComposition.average.data = this.calculateGmbCP(granulometryComposition.average.data);

        granulometryComposition.average.Gmb = this.calculateGmb2(granulometryComposition.average.data);

        granulometryComposition.average.data = this.calculateC(granulometryComposition.average.data, maxNIndex);
        granulometryComposition.average.data = this.calculateExpectedGmb_C(granulometryComposition.average.data);
        granulometryComposition.average.data = this.calculatePercentageGmm(granulometryComposition.average);
        granulometryComposition.average.data = this.calculatePlanilhaVv(granulometryComposition.average.data);
        granulometryComposition.average.data = this.calculateVcb(granulometryComposition.average);
        granulometryComposition.average.data = this.calculateVam(granulometryComposition.average.data);
        granulometryComposition.average.data = this.calculateRbv(granulometryComposition.average.data);

        granulometryComposition.average.percentWaterAbs = this.percentageWaterAbsorbed(
          granulometryComposition.average.data,
        );

        granulometryComposition.average.samplesData = granulometryComposition.average.data;

        granulometryComposition.average.initialN.samplesData = this.separateNValues(
          granulometryComposition.average.data,
          initialNIndex,
        );
        granulometryComposition.average.projectN.samplesData = this.separateNValues(
          granulometryComposition.average.data,
          projectNIndex,
        );
        granulometryComposition.average.maxN.samplesData = this.separateNValues(
          granulometryComposition.average.data,
          maxNIndex,
        );

        granulometryComposition.average.initialN.percentageGmm = this.calculateAveragePercentageGmm(
          granulometryComposition.average.initialN.samplesData,
        );
        granulometryComposition.average.projectN.percentageGmm = this.calculateAveragePercentageGmm(
          granulometryComposition.average.projectN.samplesData,
        );
        granulometryComposition.average.maxN.percentageGmm = this.calculateAveragePercentageGmm(
          granulometryComposition.average.maxN.samplesData,
        );

        granulometryComposition.average.Vv = this.calculateVv2(granulometryComposition.average);

        granulometryComposition.average.Vam = this.calculateAverageVAM(
          granulometryComposition.average.projectN.samplesData,
        );

        for (let i = 0; i < porcentagesPassantsN200.length; i++) {
          passantN200average +=
            (porcentagesPassantsN200[i] * granulometryComposition.average.percentsOfDosage.value[i]) / 100;
        }

        granulometryComposition.average.ratioDustAsphalt =
          passantN200average /
          ((-(100 - granulometryComposition.average.Pli) *
            binderSpecificGravity *
            (granulometryComposition.average.Gse - granulometryComposition.average.combinedGsb)) /
            (granulometryComposition.average.Gse * granulometryComposition.average.combinedGsb) +
            granulometryComposition.average.Pli);
      }

      let passantN200higher = 0;

      if (chosenCurves.higher) {
        granulometryComposition.higher.Gmm = granulometryComposition.higher.Gmm;
        granulometryComposition.higher.Pli = granulometryComposition.higher.Pli;

        granulometryComposition.higher.data = this.calculateExpectedGmb(granulometryComposition.higher.data);
        granulometryComposition.higher.data = this.calculateGmbCP(granulometryComposition.higher.data);

        granulometryComposition.higher.Gmb = this.calculateGmb2(granulometryComposition.higher.data);

        granulometryComposition.higher.data = this.calculateC(granulometryComposition.higher.data, maxNIndex);
        granulometryComposition.higher.data = this.calculateExpectedGmb_C(granulometryComposition.higher.data);
        granulometryComposition.higher.data = this.calculatePercentageGmm(granulometryComposition.higher);
        granulometryComposition.higher.data = this.calculatePlanilhaVv(granulometryComposition.higher.data);
        granulometryComposition.higher.data = this.calculateVcb(granulometryComposition.higher);
        granulometryComposition.higher.data = this.calculateVam(granulometryComposition.higher.data);
        granulometryComposition.higher.data = this.calculateRbv(granulometryComposition.higher.data);

        granulometryComposition.higher.percentWaterAbs = this.percentageWaterAbsorbed(
          granulometryComposition.higher.data,
        );

        granulometryComposition.higher.samplesData = granulometryComposition.higher.data;

        granulometryComposition.higher.initialN.samplesData = this.separateNValues(
          granulometryComposition.higher.data,
          initialNIndex,
        );
        granulometryComposition.higher.projectN.samplesData = this.separateNValues(
          granulometryComposition.higher.data,
          projectNIndex,
        );
        granulometryComposition.higher.maxN.samplesData = this.separateNValues(
          granulometryComposition.higher.data,
          maxNIndex,
        );

        granulometryComposition.higher.initialN.percentageGmm = this.calculateAveragePercentageGmm(
          granulometryComposition.higher.initialN.samplesData,
        );
        granulometryComposition.higher.projectN.percentageGmm = this.calculateAveragePercentageGmm(
          granulometryComposition.higher.projectN.samplesData,
        );
        granulometryComposition.higher.maxN.percentageGmm = this.calculateAveragePercentageGmm(
          granulometryComposition.higher.maxN.samplesData,
        );

        granulometryComposition.higher.Vv = this.calculateVv2(granulometryComposition.higher);

        granulometryComposition.higher.Vam = this.calculateAverageVAM(
          granulometryComposition.higher.projectN.samplesData,
        );

        for (let i = 0; i < porcentagesPassantsN200.length; i++) {
          passantN200higher +=
            (porcentagesPassantsN200[i] * granulometryComposition.higher.percentsOfDosage.value[i]) / 100;
        }

        granulometryComposition.higher.ratioDustAsphalt =
          passantN200higher /
          ((-(100 - granulometryComposition.higher.Pli) *
            binderSpecificGravity *
            (granulometryComposition.higher.Gse - granulometryComposition.higher.combinedGsb)) /
            (granulometryComposition.higher.Gse * granulometryComposition.higher.combinedGsb) +
            granulometryComposition.higher.Pli);
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
        const expectedPliLower = granulometryComposition.lower.Pli - 0.4 * (4 - granulometryComposition.lower.Vv);

        granulometryComposition.lower.expectedPli = expectedPliLower;

        let Clower;

        if (granulometryComposition.lower.Vv < 4) Clower = 0.1;
        else Clower = 0.2;

        const expectedVamLower = granulometryComposition.lower.Vam + Clower * (4 - granulometryComposition.lower.Vv);

        const expectedRBVLower = (expectedVamLower - 4) / expectedVamLower;

        const expectedPercentageGmmInitialNLower =
          granulometryComposition.lower.initialN.percentageGmm - 4 + granulometryComposition.lower.Vv;

        const expectedPercentageGmmMaxNLower =
          granulometryComposition.lower.maxN.percentageGmm - 4 + granulometryComposition.lower.Vv;

        const expectedRatioDustAsphaltLower =
          passantN200lower /
          ((-(100 - expectedPliLower) *
            binderSpecificGravity *
            (granulometryComposition.lower.Gse - granulometryComposition.lower.combinedGsb)) /
            (granulometryComposition.lower.Gse * granulometryComposition.lower.combinedGsb) +
            expectedPliLower);

        table2Lower = {
          percentageGmmInitialN: granulometryComposition.lower.initialN.percentageGmm,
          percentageGmmProjectN: granulometryComposition.lower.projectN.percentageGmm,
          percentageGmmMaxN: granulometryComposition.lower.maxN.percentageGmm,
          porcentageVv: granulometryComposition.lower.Vv,
          porcentageVam: granulometryComposition.lower.Vam,
          specificMass: granulometryComposition.lower.Gmb,
          percentWaterAbs: granulometryComposition.lower.percentWaterAbs,
          ratioDustAsphalt: granulometryComposition.lower.ratioDustAsphalt,
        };

        table3Lower = {
          expectedPliLower,
          expectedVamLower,
          expectedRBVLower,
          expectedRatioDustAsphaltLower,
          expectedPercentageGmmInitialNLower,
          expectedPercentageGmmMaxNLower,
        };

        let graphData = this.calculateGraphData(granulometryComposition.lower.samplesData);

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
        const expectedPliAverage = granulometryComposition.average.Pli - 0.4 * (4 - granulometryComposition.average.Vv);

        granulometryComposition.average.expectedPli = expectedPliAverage;

        let Caverage;

        if (granulometryComposition.average.Vv < 4) Caverage = 0.1;
        else Caverage = 0.2;

        const expectedVamAverage =
          granulometryComposition.average.Vam + Caverage * (4 - granulometryComposition.average.Vv);

        const expectedRBVAverage = (expectedVamAverage - 4) / expectedVamAverage;

        const expectedPercentageGmmInitialNAverage =
          granulometryComposition.average.initialN.percentageGmm - 4 + granulometryComposition.average.Vv;

        const expectedPercentageGmmMaxNAverage =
          granulometryComposition.average.maxN.percentageGmm - 4 + granulometryComposition.average.Vv;

        const expectedRatioDustAsphaltAverage =
          passantN200average /
          ((-(100 - expectedPliAverage) *
            binderSpecificGravity *
            (granulometryComposition.average.Gse - granulometryComposition.average.combinedGsb)) /
            (granulometryComposition.average.Gse * granulometryComposition.average.combinedGsb) +
            expectedPliAverage);

        table2Average = {
          percentageGmmInitialN: granulometryComposition.average.initialN.percentageGmm,
          percentageGmmProjectN: granulometryComposition.average.projectN.percentageGmm,
          percentageGmmMaxN: granulometryComposition.average.maxN.percentageGmm,
          porcentageVv: granulometryComposition.average.Vv,
          porcentageVam: granulometryComposition.average.Vam,
          specificMass: granulometryComposition.average.Gmb,
          percentWaterAbs: granulometryComposition.average.percentWaterAbs,
          ratioDustAsphalt: granulometryComposition.average.ratioDustAsphalt,
        };

        table3Average = {
          expectedPliAverage,
          expectedVamAverage,
          expectedRBVAverage,
          expectedRatioDustAsphaltAverage,
          expectedPercentageGmmInitialNAverage,
          expectedPercentageGmmMaxNAverage,
        };

        let graphData = this.calculateGraphData(granulometryComposition.average.samplesData);

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
        const expectedPliHigher = granulometryComposition.higher.Pli - 0.4 * (4 - granulometryComposition.higher.Vv);

        granulometryComposition.higher.expectedPli = expectedPliHigher;

        let Chigher;

        if (granulometryComposition.higher.Vv < 4) Chigher = 0.1;
        else Chigher = 0.2;

        const expectedVamHigher =
          granulometryComposition.higher.Vam + Chigher * (4 - granulometryComposition.higher.Vv);

        const expectedRBVHigher = (expectedVamHigher - 4) / expectedVamHigher;

        const expectedPercentageGmmInitialNHigher =
          granulometryComposition.higher.initialN.percentageGmm - 4 + granulometryComposition.higher.Vv;

        const expectedPercentageGmmMaxNHigher =
          granulometryComposition.higher.maxN.percentageGmm - 4 + granulometryComposition.higher.Vv;

        const expectedRatioDustAsphaltHigher =
          passantN200higher /
          ((-(100 - expectedPliHigher) *
            binderSpecificGravity *
            (granulometryComposition.higher.Gse - granulometryComposition.higher.combinedGsb)) /
            (granulometryComposition.higher.Gse * granulometryComposition.higher.combinedGsb) +
            expectedPliHigher);

        table2Higher = {
          percentageGmmInitialN: granulometryComposition.higher.initialN.percentageGmm,
          percentageGmmProjectN: granulometryComposition.higher.projectN.percentageGmm,
          percentageGmmMaxN: granulometryComposition.higher.maxN.percentageGmm,
          porcentageVv: granulometryComposition.higher.Vv,
          porcentageVam: granulometryComposition.higher.Vam,
          specificMass: granulometryComposition.higher.Gmb,
          percentWaterAbs: granulometryComposition.higher.percentWaterAbs,
          ratioDustAsphalt: granulometryComposition.higher.ratioDustAsphalt,
        };

        table3Higher = {
          expectedPliHigher,
          expectedVamHigher,
          expectedRBVHigher,
          expectedRatioDustAsphaltHigher,
          expectedPercentageGmmInitialNHigher,
          expectedPercentageGmmMaxNHigher,
        };

        let graphData = this.calculateGraphData(granulometryComposition.higher.samplesData);

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
}
