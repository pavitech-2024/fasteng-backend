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
var Calc_Ddui_Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calc_Ddui_Service = void 0;
const common_1 = require("@nestjs/common");
let Calc_Ddui_Service = Calc_Ddui_Service_1 = class Calc_Ddui_Service {
    constructor() {
        this.logger = new common_1.Logger(Calc_Ddui_Service_1.name);
    }
    confirmResults(data, pressConst) {
        const conditionedData = [];
        const unconditionedData = [];
        data.forEach((row) => {
            Object.keys(row).forEach((key) => {
                if (key === "condicionamento") {
                    if (row[key] === true) {
                        conditionedData.push(row);
                    }
                    else {
                        unconditionedData.push(row);
                    }
                }
            });
        });
        const { rtsMpa: everyRtsMpa, rtsKgf: everyRtsKgf, average: everyAverage, } = this.calculateRtsValues(data, pressConst);
        const { rtsMpa: conditionedRtsMpa, rtsKgf: conditionedRtsKgf, average: conditionedAverage, } = this.calculateRtsValues(conditionedData, pressConst);
        const { rtsMpa: unconditionedRtsMpa, rtsKgf: unconditionedRtsKgf, average: unconditionedAverage, } = this.calculateRtsValues(unconditionedData, pressConst);
        const rrt = conditionedAverage / unconditionedAverage;
        return {
            everyRtsMpa,
            everyRtsKgf,
            conditionedAverage,
            unconditionedAverage,
            rrt,
        };
    }
    calculateDdui(_a) {
        return __awaiter(this, arguments, void 0, function* ({ dduiStep2, dduiStep3, generalData }) {
            try {
                this.logger.log('calculate sand equivalent on calc.ddui.service.ts > [body]');
                const result = this.confirmResults(dduiStep3.ddui_data, dduiStep2.pressConstant);
                return {
                    success: true,
                    result: result,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    calculateRtsValues(data, pressConst) {
        const rtsMpa = [];
        const rtsKgf = [];
        data.forEach((row) => {
            let sumDiameter = 0;
            let nDiameter = 0;
            let sumHeight = 0;
            let nHeight = 0;
            Object.keys(row).forEach((key) => {
                if (String(key)[0] === 'd') {
                    if (row[key] !== null) {
                        sumDiameter += row[key];
                        nDiameter++;
                    }
                }
                if (String(key)[0] === 'h') {
                    if (row[key] !== null) {
                        sumHeight += row[key];
                        nHeight++;
                    }
                }
            });
            const averageDiameter = sumDiameter / nDiameter;
            const averageHeight = sumHeight / nHeight;
            const rtMpa = ((2 * pressConst * row["pressReading"]) / (Math.PI * (averageDiameter / 10) * (averageHeight / 10)) / 10);
            const rtKgf = rtMpa * 10;
            rtsMpa.push(rtMpa);
            rtsKgf.push(rtKgf);
        });
        let totalRt = 0;
        for (const value of rtsMpa) {
            totalRt += value;
        }
        const average = totalRt / rtsMpa.length;
        return { rtsMpa, rtsKgf, average };
    }
};
exports.Calc_Ddui_Service = Calc_Ddui_Service;
exports.Calc_Ddui_Service = Calc_Ddui_Service = Calc_Ddui_Service_1 = __decorate([
    (0, common_1.Injectable)()
], Calc_Ddui_Service);
//# sourceMappingURL=calc-ddui.service.js.map