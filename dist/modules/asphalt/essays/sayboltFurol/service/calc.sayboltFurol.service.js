"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var Calc_SayboltFurol_Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calc_SayboltFurol_Service = void 0;
const common_1 = require("@nestjs/common");
let Calc_SayboltFurol_Service = Calc_SayboltFurol_Service_1 = class Calc_SayboltFurol_Service {
    constructor() {
        this.logger = new common_1.Logger(Calc_SayboltFurol_Service_1.name);
    }
    calculateSayboltFurol({ sayboltFurol, generalData }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log('calculate saybolt-furol on calc.sayboltFurol.service.ts > [body]');
                const { dataPoints } = sayboltFurol;
                const result = {
                    graph: "",
                    machiningTemperatureRange: {
                        higher: 0,
                        lower: 0,
                        average: 0
                    },
                    compressionTemperatureRange: {
                        higher: 0,
                        lower: 0,
                        average: 0
                    },
                    aggregateTemperatureRange: {
                        higher: 0,
                        lower: 0,
                        average: 0
                    },
                    curvePoints: [],
                    equation: {
                        aIndex: 0,
                        bIndex: 0
                    }
                };
                let temperatures = [];
                let viscositys = [];
                const equation = this.calculateEquation(dataPoints);
                let cont = 120;
                for (let i = 0; i < 120; i++) {
                    temperatures[i] = cont;
                    viscositys[i] = this.calculateViscosity(cont, equation) !== Infinity ? this.calculateViscosity(cont, equation) : 0;
                    cont += 1;
                }
                const ranges = this.insertValuesInRanges(75, 95, 125, 155, equation);
                const bandsOfCurve = this.insertBandsOfCurve(temperatures, viscositys, 75, 95, 125, 155);
                result.curvePoints = bandsOfCurve;
                result.aggregateTemperatureRange = ranges.aggregateTemperatureRange;
                result.compressionTemperatureRange = ranges.compressionTemperatureRange;
                result.machiningTemperatureRange = ranges.machiningTemperatureRange;
                result.equation.aIndex = equation.aIndex;
                result.equation.bIndex = equation.bIndex;
                return {
                    success: true,
                    result,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    calculateEquation(dataPoints) {
        const aIndex = ((dataPoints.length * this.sumXY(dataPoints)) - (this.sumX(dataPoints) * this.sumY(dataPoints))) / (dataPoints.length * this.sumPow2X(dataPoints) - this.Pow2SumX(dataPoints));
        const bIndex = Math.exp(((this.sumX(dataPoints) * this.sumXY(dataPoints)) - (this.sumY(dataPoints) * this.sumPow2X(dataPoints))) / (this.Pow2SumX(dataPoints) - (dataPoints.length * this.sumPow2X(dataPoints))));
        const equationValues = {
            aIndex,
            bIndex
        };
        return equationValues;
    }
    sumXY(dataPoints) {
        let exit = 0;
        for (let i = 0; i < dataPoints.length; i++) {
            exit += dataPoints[i].temperature * Math.log(dataPoints[i].viscosity);
        }
        return exit;
    }
    sumX(dataPoints) {
        let exit = 0;
        for (let i = 0; i < dataPoints.length; i++) {
            exit += dataPoints[i].temperature;
        }
        return exit;
    }
    sumY(dataPoints) {
        let exit = 0;
        for (let i = 0; i < dataPoints.length; i++) {
            exit += Math.log(dataPoints[i].viscosity);
        }
        return exit;
    }
    sumPow2X(dataPoints) {
        let exit = 0;
        for (let i = 0; i < dataPoints.length; i++) {
            exit += dataPoints[i].temperature * dataPoints[i].temperature;
        }
        return exit;
    }
    Pow2SumX(dataPoints) {
        let exit = 0;
        for (let i = 0; i < dataPoints.length; i++) {
            exit += dataPoints[i].temperature;
        }
        return exit * exit;
    }
    calculateViscosity(temperature, equation) {
        let viscosity = equation.bIndex * Math.exp(equation.aIndex * temperature);
        return viscosity;
    }
    calculateTemperature(viscosity, equation) {
        let temperature = (Math.log(viscosity) - Math.log(equation.bIndex)) / equation.aIndex;
        return temperature;
    }
    insertValuesInRanges(temp1, temp2, temp3, temp4, equation) {
        const lowerMachiningTemperatureRange = this.calculateTemperature(temp2, equation);
        const higherMachiningTemperatureRange = this.calculateTemperature(temp1, equation);
        const averageMachiningTemperatureRange = (this.calculateTemperature(temp2, equation) + this.calculateTemperature(temp2, equation) / 2);
        const machiningTemperatureRange = {
            lower: lowerMachiningTemperatureRange,
            higher: higherMachiningTemperatureRange,
            average: averageMachiningTemperatureRange
        };
        const lowerCompressionTemperatureRange = this.calculateTemperature(temp4, equation);
        const higherCompressionTemperatureRange = this.calculateTemperature(temp3, equation);
        const averageCompressionTemperatureRange = (this.calculateTemperature(temp3, equation) + this.calculateTemperature(temp4, equation) / 2);
        const compressionTemperatureRange = {
            lower: lowerCompressionTemperatureRange,
            higher: higherCompressionTemperatureRange,
            average: averageCompressionTemperatureRange
        };
        let higherAggregateTemperature, lowerAggregateTemperature;
        if (higherMachiningTemperatureRange + 15 > 177)
            higherAggregateTemperature = 177;
        else
            higherAggregateTemperature = higherMachiningTemperatureRange + 15;
        if (lowerMachiningTemperatureRange + 15 > 177)
            lowerAggregateTemperature = 177;
        else
            lowerAggregateTemperature = lowerMachiningTemperatureRange + 15;
        const aggregateTemperatureRange = {
            higher: higherAggregateTemperature,
            average: (higherAggregateTemperature + lowerAggregateTemperature) / 2,
            lower: lowerAggregateTemperature
        };
        return {
            machiningTemperatureRange,
            compressionTemperatureRange,
            aggregateTemperatureRange
        };
    }
    insertBandsOfCurve(temperatures, viscositys, bandsLowerMachiningY, bandsHigherMachiningY, bandsLowerCompressionY, bandsHigherCompressionY) {
        let points = [];
        let temperature;
        let viscosity;
        points.push(["Temperatura (ºC)", "Viscosidade (SSF)", "Faixa de usinagem", "Faixa de usinagem", "Faixa de compactação", "Faixa de compactação"]);
        for (let index = 0; index < temperatures.length; index++) {
            temperature = temperatures[index];
            viscosity = viscositys[index];
            points.push([temperature, viscosity, bandsLowerMachiningY, bandsHigherMachiningY, bandsLowerCompressionY, bandsHigherCompressionY]);
        }
        return points;
    }
};
Calc_SayboltFurol_Service = Calc_SayboltFurol_Service_1 = __decorate([
    (0, common_1.Injectable)()
], Calc_SayboltFurol_Service);
exports.Calc_SayboltFurol_Service = Calc_SayboltFurol_Service;
//# sourceMappingURL=calc.sayboltFurol.service.js.map