"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var Calc_Compression_Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calc_Compression_Service = void 0;
const common_1 = require("@nestjs/common");
const repository_1 = require("../repository");
const repository_2 = require("../../../../../modules/soils/samples/repository");
const PolynomialRegression = require("ml-regression-polynomial");
let Calc_Compression_Service = Calc_Compression_Service_1 = class Calc_Compression_Service {
    constructor(compressionRepository, sampleRepository) {
        this.compressionRepository = compressionRepository;
        this.sampleRepository = sampleRepository;
        this.logger = new common_1.Logger(Calc_Compression_Service_1.name);
    }
    calculateCompression(_a) {
        return __awaiter(this, arguments, void 0, function* ({ hygroscopicData, humidityDeterminationData, }) {
            try {
                this.logger.log('calculate compression on calc.compression.service.ts > [body]');
                const { hygroscopicTable, moldNumber, moldVolume, moldWeight, socketWeight, spaceDiscThickness, strokesPerLayer, layers, } = hygroscopicData;
                const { humidityTable } = humidityDeterminationData;
                const waterWeight = hygroscopicTable.map((element, i) => element.wetGrossWeightCapsule - element.dryGrossWeight);
                const netWeightDrySoil = hygroscopicTable.map((element, i) => element.dryGrossWeight - element.capsuleTare);
                const hygroscopicMoisture = waterWeight.reduce((acc, element, i) => (acc = (element * 100) / netWeightDrySoil[i]), 0) / waterWeight.length;
                const wetSoilWeights = humidityTable.map((element) => element.wetGrossWeights - moldWeight);
                const wetSoilDensitys = wetSoilWeights.map((element) => element / moldVolume);
                const waterWeights = humidityTable.map((element) => element.wetGrossWeightsCapsule - element.dryGrossWeightsCapsule);
                const netWeightsDrySoil = humidityTable.map((element) => element.dryGrossWeightsCapsule - element.capsulesTare);
                const moistures = waterWeights.map((element, i) => (element * 100) / netWeightsDrySoil[i]);
                const drySoilDensitys = wetSoilDensitys.map((element, i) => (element * 10000) / ((moistures[i] + 100) * 100));
                const regression = new PolynomialRegression(moistures, drySoilDensitys, 4);
                const { a_index, b_index } = this.findAB(drySoilDensitys);
                const optimumMoisture = this.bisection(moistures[a_index], moistures[b_index], regression.coefficients);
                const optimumDensity = regression.coefficients[0] +
                    (regression.coefficients[1] * optimumMoisture) +
                    (regression.coefficients[2] * Math.pow(optimumMoisture, 2)) +
                    (regression.coefficients[3] * Math.pow(optimumMoisture, 3)) +
                    (regression.coefficients[4] * Math.pow(optimumMoisture, 4));
                const graph = moistures.map((element, i) => [element, drySoilDensitys[i]]);
                return {
                    success: true,
                    result: {
                        waterWeight,
                        netWeightDrySoil,
                        hygroscopicMoisture,
                        wetSoilWeights,
                        wetSoilDensitys,
                        waterWeights,
                        netWeightsDrySoil,
                        moistures,
                        drySoilDensitys,
                        regression,
                        a_index,
                        b_index,
                        optimumMoisture,
                        optimumDensity,
                        graph,
                        socketWeight,
                        spaceDiscThickness,
                        strokesPerLayer,
                        layers,
                        moldNumber,
                    },
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    bisection(a, b, coefficients) {
        let x;
        while (b - a > 0.0000001) {
            x = (a + b) / 2;
            const fa = 4 * coefficients[4] * Math.pow(a, 3) +
                3 * coefficients[3] * Math.pow(a, 2) +
                2 * coefficients[2] * a +
                coefficients[1];
            const fx = 4 * coefficients[4] * Math.pow(x, 3) +
                3 * coefficients[3] * Math.pow(x, 2) +
                2 * coefficients[2] * x +
                coefficients[1];
            if (fa * fx < 0)
                b = x;
            else
                a = x;
        }
        return x;
    }
    findAB(array) {
        let a_index = 0;
        let b_index = 0;
        for (let i = 0; i < array.length; i++) {
            if (array[i] > array[b_index]) {
                a_index = b_index;
                b_index = i;
            }
            else if (array[i] > array[a_index]) {
                a_index = i;
            }
        }
        return { a_index, b_index };
    }
};
exports.Calc_Compression_Service = Calc_Compression_Service;
exports.Calc_Compression_Service = Calc_Compression_Service = Calc_Compression_Service_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repository_1.CompressionRepository,
        repository_2.SamplesRepository])
], Calc_Compression_Service);
//# sourceMappingURL=calc.compression.service.js.map